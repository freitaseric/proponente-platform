import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import Fastify from 'fastify';
import authRoutes from './modules/auth/auth.routes.js';
import { env } from './shared/env.js';

const fastify = Fastify({ logger: true });
const host = process.env.HOST ?? 'localhost';
const port = Number(process.env.PORT ?? 3000);
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

fastify.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Captaflow API',
			description: 'HTTP API documentation for Captaflow.',
			version: '1.0.0',
		},
		tags: [
			{ name: 'Health', description: 'Service health checks.' },
			{
				name: 'Better Auth',
				description: 'Authentication endpoints handled by Better Auth.',
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},
});

fastify.get(
	'/health',
	{
		schema: {
			tags: ['Health'],
			summary: 'Check API health',
			response: {
				200: {
					type: 'object',
					properties: {
						status: { type: 'string', enum: ['ok'] },
					},
					required: ['status'],
				},
			},
		},
	},
	async (_, reply) => {
		reply.send({ status: 'ok' });
	}
);

fastify.register(authRoutes);

fastify.register(fastifySwaggerUi, {
	routePrefix: '/docs',
	uiConfig: {
		urls: [
			{ name: 'Better Auth', url: '/auth/open-api/generate-schema' },
			{ name: 'Captaflow API', url: '/docs/json' },
		],
		docExpansion: 'list',
		deepLinking: true,
	},
});

fastify.listen({ port, host }, err => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}

	console.log(`Server is running at http://${host}:${port}`);
});