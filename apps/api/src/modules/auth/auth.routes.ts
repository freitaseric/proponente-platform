import { fromNodeHeaders } from 'better-auth/node';
import type { FastifyPluginAsync } from 'fastify';
import { auth } from '../../shared/auth.js';

const authRoutes: FastifyPluginAsync = async fastify => {
	fastify.get(
		'/auth/@me',
		{
			schema: {
				tags: ['Better Auth'],
				summary: 'Get current authenticated session',
				security: [{ bearerAuth: [] }],
				response: {
					200: {
						description: 'Current session returned by Better Auth.',
						type: 'object',
						additionalProperties: true,
					},
					401: {
						description: 'No active authenticated session.',
						type: 'object',
						properties: {
							error: { type: 'string' },
						},
						required: ['error'],
					},
				},
			},
		},
		async (request, reply) => {
			const session = await auth.api.getSession({
				headers: fromNodeHeaders(request.headers),
			});

			if (!session) return reply.status(401).send({ error: 'Unauthorized' });

			return reply.send(session);
		}
	);

	fastify.route({
		method: ['GET', 'POST', "OPTIONS"],
		url: '/auth/*',
		schema: {
			tags: ['Better Auth'],
			summary: 'Handle Better Auth endpoints',
			description:
				'Delegates Better Auth routes such as sign-in, sign-up, OAuth callbacks, session, and sign-out to the Better Auth handler.',
			security: [{ bearerAuth: [] }],
			response: {
				200: {
					description: 'Better Auth response.',
				},
				400: {
					description: 'Invalid authentication request.',
				},
				401: {
					description: 'Authentication is required or failed.',
				},
				500: {
					description: 'Internal authentication error.',
					type: 'object',
					properties: {
						error: { type: 'string' },
						code: { type: 'string' },
					},
					required: ['error', 'code'],
				},
			},
		},
		async handler(request, reply) {
			try {
				const url = new URL(request.url, `http://${request.headers.host}`);

				const headers = fromNodeHeaders(request.headers);

				const req = new Request(url.toString(), {
					method: request.method,
					headers,
					...(request.body ? { body: JSON.stringify(request.body) } : {}),
				});

				const response = await auth.handler(req);

				reply.status(response.status as 200 | 400 | 401 | 500);
				for (const [key, value] of response.headers.entries()) {
					reply.header(key, value);
				}

				return reply.send(response.body ? await response.text() : null);
			} catch (error) {
				fastify.log.error(error, 'Authentication Error:');
				return reply.status(500).send({
					error: 'Internal authentication error',
					code: 'AUTH_FAILURE',
				});
			}
		},
	});
};

export default authRoutes;