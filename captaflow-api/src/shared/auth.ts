import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth/minimal';
import { openAPI } from 'better-auth/plugins';
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
	plugins: [openAPI({ disableDefaultReference: true })],
	database: drizzleAdapter(db, {
		provider: 'pg',
		transaction: true,
		usePlural: true,
		schema,
	}),
	appName: 'Captaflow',
	logger: console,
	trustedOrigins: [
		...env.CORS_ALLOWED_ORIGINS.split(',')
			.map(origin => origin.trim())
			.filter(Boolean),
		'http://localhost:3000',
	],
});

export type Session = typeof auth.$Infer.Session;