import EventEmitter from 'events';
import OptionResolver from './optionResolverPolyfill';

/**
 * Gamepad Handler
 *
 * @param {Gamepad} gamepad
 * @param {Object} options
 */
class GamepadHandler extends EventEmitter {
  constructor(gamepad, options) {
    super();

    this.optionResolver = new OptionResolver(false);
    this.optionResolver.setDefaults({
      analog: true,
      deadZone: 0,
      precision: 0
    });
    this.optionResolver.setTypes({
      analog: 'boolean',
      deadZone: 'number',
      precision: 'number'
    });

    this.gamepad = gamepad;
    this.options = this.resolveOptions(typeof(options) === 'object' ? options : {});
    this.sticks  = new Array(this.gamepad.axes.length);
    this.buttons = new Array(this.gamepad.buttons.length);

    for (let s = this.sticks.length - 1; s >= 0; s--) {
      this.sticks[s] = [0, 0];
    }

    for (let b = this.buttons.length - 1; b >= 0; b--) {
      this.buttons[b] = 0;
    }

    this.gamepad.handler = this;
  }

  /**
   * Resolve options
   *
   * @param {Object} options
   *
   * @return {Object}
   */
  resolveOptions(source) {
    const customStick = typeof source.stick !== 'undefined';
    const customButton = typeof source.button !== 'undefined';

    const options = {
      stick: this.optionResolver.resolve(customStick ? source.stick : (customButton ? {} : source)),
      button: this.optionResolver.resolve(customButton ? source.button : (customStick ? {} : source))
    };

    options.stick.deadZone   = Math.max(Math.min(options.stick.deadZone, 1), 0);
    options.button.deadZone  = Math.max(Math.min(options.button.deadZone, 1), 0);
    options.stick.precision  = options.stick.precision ? 10 ** options.stick.precision : 0;
    options.button.precision = options.button.precision ? 10 ** options.button.precision : 0;

    return options;
  }

  /**
   * Update
   */
  update() {
    let i = 0;
    let s = 0;
    let a = 0;

    for (s = 0; s < 2; s++) {
      for (a = 0; a < 2; a++) {
        this.setStick(s, a, this.gamepad.axes[i], this.options.stick);
        i++;
      }
    }

    for (i = this.gamepad.buttons.length - 1; i >= 0; i--) {
      this.setButton(i, this.gamepad.buttons[i], this.options.button);
    }
  }

  /**
   * Set stick
   *
   * @param {Number} stick
   * @param {Number} axis
   * @param {Number} value
   */
  setStick(stick, axis, value, options) {
    if (options.deadZone && value < options.deadZone && value > -options.deadZone) {
      value = 0;
    }

    if (!options.analog) {
      value = value > 0 ? 1 : value < 0 ? -1 : 0;
    } else if (options.precision) {
      value = Math.round(value * options.precision) / options.precision;
    }

    if (this.sticks[stick][axis] !== value) {
      this.sticks[stick][axis] = value;
      this.emit('axis', {
        gamepad: this.gamepad,
        axis,
        value: this.sticks[stick][axis]
      });
    }
  }

  /**
   * Set button
   *
   * @param {Number} index
   * @param {GamepadButton} button
   */
  setButton(index, button, options) {
    let value = button.value;

    if (options.deadZone && button.value < options.deadZone && button.value > -options.deadZone) {
      value = 0;
    }

    if (!options.analog) {
      value = button.pressed ? 1 : 0;
    } else if (options.precision) {
      value = Math.round(value * options.precision) / options.precision;
    }

    if (this.buttons[index] !== value) {
      this.buttons[index] = value;
      this.emit('button', {
        gamepad: this.gamepad,
        button,
        index,
        pressed: button.pressed,
        value
      });
    }
  }
}

export default GamepadHandler;
