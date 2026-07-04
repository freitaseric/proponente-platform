import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import type { AuthSession } from '@captaflow/contracts/auth';
import { betterAuth } from 'better-auth/minimal';
import { oneTimeToken, openAPI } from 'better-auth/plugins';
import { db } from '../db/client.js';
import schema from '../db/schema/index.js';
import { env } from './env.js';

export const auth = betterAuth({
	basePath: '/auth',
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	plugins: [
		oneTimeToken({
			expiresIn: 3,
			storeToken: 'hashed',
		}),
		openAPI({ disableDefaultReference: true }),
	],
	database: drizzleAdapter(db, {
		provider: 'pg',
		transaction: true,
		usePlural: true,
		schema,
	}),
	appName: 'Captaflow',
	logger: console,
	trustedOrigins: [
		env.WEB_PUBLIC_URL,
		env.API_PUBLIC_URL,
		...env.CORS_ALLOWED_ORIGINS.split(',')
			.map(origin => origin.trim())
			.filter(Boolean),
	],
});

export type Session = AuthSession;
