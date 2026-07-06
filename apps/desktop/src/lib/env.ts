type PublicEnvKey = 'VITE_API_BASE_URL' | 'VITE_WEB_BASE_URL';

function readPublicFlag(key: 'VITE_MOCK_SESSION') {
	const value = import.meta.env[key];

	if (!value) {
		return false;
	}

	return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function readPublicUrl(key: PublicEnvKey, developmentDefault: string) {
	const value = import.meta.env[key] || developmentDefault;

	if (import.meta.env.PROD && !import.meta.env[key]) {
		throw new Error(`${key} must be defined when building the desktop app.`);
	}

	try {
		const url = new URL(value);
		return url.toString().replace(/\/$/, '');
	} catch {
		throw new Error(`${key} must be a valid absolute URL.`);
	}
}

export const publicEnv = {
	apiBaseUrl: readPublicUrl('VITE_API_BASE_URL', 'http://localhost:3000'),
	webBaseUrl: readPublicUrl('VITE_WEB_BASE_URL', 'http://localhost:5173'),
	mockSession:
		readPublicFlag('VITE_MOCK_SESSION') &&
		(!import.meta.env.PROD ||
			import.meta.env.VITE_ALLOW_MOCK_SESSION_IN_PRODUCTION === 'true'),
} as const;
