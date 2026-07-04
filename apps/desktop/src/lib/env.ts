type PublicEnvKey = 'VITE_API_BASE_URL' | 'VITE_WEB_BASE_URL';

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
} as const;
