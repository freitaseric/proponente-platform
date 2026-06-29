import fastifyCors from '@fastify/cors';
import Fastify from 'fastify';
import authRoutes from './modules/auth/auth.routes.js';
import { env } from './shared/env.js';

const fastify = Fastify({ logger: true });
const corsAllowedOrigins = new Set(
	env.CORS_ALLOWED_ORIGINS.split(',')
		.map(origin => origin.trim())
		.filter(Boolean)
);

fastify.register(fastifyCors, {
	origin: (origin, callback) => {
		if (origin === undefined || corsAllowedOrigins.has(origin)) {
			callback(null, true);
			return;
		}

		callback(null, false);
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
	credentials: true,
	maxAge: 86400,
});

fastify.get('/health', async (_, reply) => {
	reply.send({ status: 'ok' });
});

fastify.register(authRoutes);

fastify.listen({ port: 3000, host: 'localhost' }, err => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}

	console.log('Server is running at http://localhost:3000');
});