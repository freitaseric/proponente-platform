/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL?: string;
	readonly VITE_WEB_BASE_URL?: string;
	readonly VITE_MOCK_SESSION?: string;
	readonly VITE_ALLOW_MOCK_SESSION_IN_PRODUCTION?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
