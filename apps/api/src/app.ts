import path from 'node:path';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastifySwagger, { type SwaggerTransformObject } from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import Fastify from 'fastify';
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod';
import { z } from 'zod';
import authRoutes from './modules/auth/auth.routes.js';
import updaterRoutes from './modules/updater/updater.routes.js';
import { auth } from './shared/auth.js';
import { env } from './shared/env.js';

const isDevelopment = env.NODE_ENV !== 'production';

const fastify = Fastify({
	logger: isDevelopment
		? {
				level: 'debug',
				transport: {
					target: 'pino-pretty',
					options: {
						colorize: true,
						translateTime: 'HH:MM:ss',
						ignore: 'pid,hostname',
					},
				},
			}
		: {
				level: 'info',
				redact: [
					'req.headers.authorization',
					'req.headers.cookie',
					'body.password',
					'body.token',
					'body.accessToken',
					'body.refreshToken',
					'body.clientSecret',
					'body.privateKey',
				],
			},
});
const host = process.env.HOST ?? 'localhost';
const port = Number(process.env.PORT ?? 3000);
const corsAllowedOrigins = new Set(
	[env.WEB_PUBLIC_URL, env.API_PUBLIC_URL, ...env.CORS_ALLOWED_ORIGINS.split(',')]
		.map(origin => origin.trim().replace(/\/$/, ''))
		.filter(Boolean)
);

type OpenApiDocument = {
	openapi?: string;
	info?: Record<string, unknown>;
	paths?: Record<string, unknown>;
	tags?: Array<Record<string, unknown>>;
	components?: Record<string, Record<string, unknown>>;
	[key: string]: unknown;
};

const authTag = {
	name: 'Autenticação',
	description:
		'Endpoints de autenticação, sessão, contas e provedores sociais.',
};

function withAuthTag(pathItem: unknown) {
	if (!pathItem || typeof pathItem !== 'object') return pathItem;

	const taggedPathItem = { ...(pathItem as Record<string, unknown>) };
	for (const [method, operation] of Object.entries(taggedPathItem)) {
		if (!operation || typeof operation !== 'object') continue;
		if (method.toLowerCase() === 'parameters') continue;

		taggedPathItem[method] = {
			...(operation as Record<string, unknown>),
			tags: [authTag.name],
		};
	}

	return taggedPathItem;
}

function mergeOpenApiDocuments(
	appDocument: OpenApiDocument,
	authDocument: OpenApiDocument
): OpenApiDocument {
	const appComponents = appDocument.components ?? {};
	const authComponents = authDocument.components ?? {};
	const authPaths = Object.fromEntries(
		Object.entries(authDocument.paths ?? {}).map(([routePath, pathItem]) => [
			routePath.startsWith('/auth') ? routePath : `/auth${routePath}`,
			withAuthTag(pathItem),
		])
	);
	const appPaths = Object.fromEntries(
		Object.entries(appDocument.paths ?? {}).map(([routePath, pathItem]) => [
			routePath,
			routePath.startsWith('/auth') ? withAuthTag(pathItem) : pathItem,
		])
	);
	const appTags = (appDocument.tags ?? []).filter(
		tag => tag.name !== authTag.name
	);

	return {
		...appDocument,
		paths: {
			...appPaths,
			...authPaths,
		},
		tags: [...appTags, authTag],
		components: {
			...appComponents,
			...authComponents,
			securitySchemes: {
				...(appComponents.securitySchemes ?? {}),
				...(authComponents.securitySchemes ?? {}),
			},
			schemas: {
				...(appComponents.schemas ?? {}),
				...(authComponents.schemas ?? {}),
			},
			responses: {
				...(appComponents.responses ?? {}),
				...(authComponents.responses ?? {}),
			},
			parameters: {
				...(appComponents.parameters ?? {}),
				...(authComponents.parameters ?? {}),
			},
			requestBodies: {
				...(appComponents.requestBodies ?? {}),
				...(authComponents.requestBodies ?? {}),
			},
			headers: {
				...(appComponents.headers ?? {}),
				...(authComponents.headers ?? {}),
			},
		},
	};
}

async function getBetterAuthOpenApiDocument() {
	const response = await auth.handler(
		new Request('http://localhost/auth/open-api/generate-schema')
	);

	if (!response.ok) {
		throw new Error(`Better Auth OpenAPI returned ${response.status}`);
	}

	return (await response.json()) as OpenApiDocument;
}

const betterAuthOpenApiDocument = isDevelopment
	? await getBetterAuthOpenApiDocument().catch(error => {
			fastify.log.warn(error, 'Failed to load Better Auth OpenAPI schema');
			return undefined;
		})
	: undefined;

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(fastifyCors, {
	origin: (origin, callback) => {
		if (
			origin === undefined ||
			corsAllowedOrigins.has(origin.replace(/\/$/, ''))
		) {
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

fastify.register(fastifyStatic, {
	root: path.resolve(process.cwd(), 'storage/releases'),
	prefix: '/downloads',
	decorateReply: false,
});

if (isDevelopment) {
	fastify.register(fastifySwagger, {
		transform: jsonSchemaTransform,
		transformObject: documentObject => {
			const openapiObject = (
				documentObject as { openapiObject?: OpenApiDocument }
			).openapiObject;

			if (!openapiObject) {
				return documentObject as ReturnType<SwaggerTransformObject>;
			}

			if (!betterAuthOpenApiDocument) {
				return openapiObject as ReturnType<SwaggerTransformObject>;
			}

			return mergeOpenApiDocuments(
				openapiObject as OpenApiDocument,
				betterAuthOpenApiDocument
			) as ReturnType<SwaggerTransformObject>;
		},
		openapi: {
			info: {
				title: 'Captaflow API',
				description: 'HTTP API documentation for Captaflow.',
				version: '1.0.0',
			},
			tags: [
				{ name: 'Health', description: 'Verificações de saúde da API.' },
				authTag,
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
}

fastify.get(
	'/health',
	{
		schema: {
			tags: ['Health'],
			summary: 'Check API health',
			response: {
				200: z.object({
					status: z.literal('ok'),
				}),
			},
		},
	},
	async (_, reply) => {
		reply.send({ status: 'ok' });
	}
);

fastify.register(authRoutes);
fastify.register(updaterRoutes);

if (isDevelopment) {
	fastify.get('/docs/combined-json', async (_, reply) => {
		return reply.send(fastify.swagger());
	});

	fastify.register(fastifySwaggerUi, {
		routePrefix: '/docs',
		uiConfig: {
			url: '/docs/json',
			docExpansion: 'list',
			deepLinking: true,
		},
	});
}

fastify.listen({ port, host }, err => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
