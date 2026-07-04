import 'dotenv/config';
import { z } from 'zod';
import { formatEnvValidationError } from './format.js';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production']).default('development'),
	WEB_PUBLIC_URL: z.url().optional(),
	API_PUBLIC_URL: z.url().optional(),
	DATABASE_URL: z.url(),
	CORS_ALLOWED_ORIGINS: z.string().optional().default(''),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
}).superRefine((env, ctx) => {
	if (env.NODE_ENV !== 'production') {
		return;
	}

	for (const key of ['WEB_PUBLIC_URL', 'API_PUBLIC_URL'] as const) {
		if (!env[key]) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: [key],
				message: `${key} must be defined in production.`,
			});
		}
	}
});

const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
	console.error(formatEnvValidationError(envResult.error));
	process.exit(1);
}

function normalizePublicUrl(url: string) {
	return url.replace(/\/$/, '');
}

export const env = {
	...envResult.data,
	WEB_PUBLIC_URL: normalizePublicUrl(
		envResult.data.WEB_PUBLIC_URL ?? 'http://localhost:5173'
	),
	API_PUBLIC_URL: normalizePublicUrl(
		envResult.data.API_PUBLIC_URL ?? 'http://localhost:3000'
	),
};

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
