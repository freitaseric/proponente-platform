import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.url(),
	CORS_ALLOWED_ORIGINS: z.string().optional().default(""),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
