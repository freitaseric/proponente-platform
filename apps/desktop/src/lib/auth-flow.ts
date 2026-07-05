export const DESKTOP_AUTH_STATE_KEY = 'proponente.desktopAuthState';

export function createDesktopAuthState() {
	if (globalThis.crypto?.randomUUID) {
		return globalThis.crypto.randomUUID();
	}

	const randomPart = Math.random().toString(36).slice(2);
	return `${Date.now().toString(36)}-${randomPart}`;
}
