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
		details: {
			index: number;
			gamepad?: Gamepad;
			button?: GamepadButton;
			pressed?: boolean;
			value?: number;
			axis?: number;
		};
	}

	export interface GamepadListener {
		new(options: ListenerOptions): undefined;
		on(event: string, callback: (event: ListenerEvent) => void): void;
	}
}
