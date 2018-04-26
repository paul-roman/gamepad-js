declare module 'gamepad-listener' {
	interface ListenerOptions {
		analog?: boolean;
		precision?: number;
		deadZone?: number;
		button?: {
			analog?: boolean;
			precision?: number;
			deadZone?: number;
		};
		stick?: {
			analog?: boolean;
			precision?: number;
			deadZone?: number;
		};
	}

	interface ListenerEvent {
		index: number;
		gamepad?: Gamepad;
		button?: GamepadButton;
		pressed?: boolean;
		value?: number;
		axis?: number;
	}

	class GamepadListener {
		constructor(options?: ListenerOptions);
		start(): void;
		stop(): void;
		on(event: string, callback: (event: ListenerEvent) => void): void;
	}
}
