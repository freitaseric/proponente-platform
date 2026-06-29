import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '../shared/env.js';
import { relations } from './schema/index.js';

export const db = drizzle(env.DATABASE_URL, {
	relations,
});