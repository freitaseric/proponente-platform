import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth/minimal';
import { db } from '../db/client.js';
import schema from '../db/schema/index.js';
import { env } from './env.js';

export const auth = betterAuth({
	basePath: '/auth',
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: 'pg',
		camelCase: true,
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