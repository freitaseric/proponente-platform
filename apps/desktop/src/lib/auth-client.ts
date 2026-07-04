import { oneTimeTokenClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { publicEnv } from './env';

export const apiBaseURL = publicEnv.apiBaseUrl;

export const authClient = createAuthClient({
	baseURL: apiBaseURL,
	basePath: '/auth',
	plugins: [oneTimeTokenClient()],
});
