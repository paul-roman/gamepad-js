declare module 'gamepad-listener' {
	interface ListenerOptions {
		analog?: boolean;
		deadZone?: number;
		button?: {
			analog?: boolean;
			deadZone?: number;
		};
		stick?: {
			analog?: boolean;
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
