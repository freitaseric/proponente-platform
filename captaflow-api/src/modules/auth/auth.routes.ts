import { fromNodeHeaders } from 'better-auth/node';
import type { FastifyPluginAsync } from 'fastify';
import { auth } from '../../shared/auth.js';

const authRoutes: FastifyPluginAsync = async fastify => {
	fastify.get('/auth/@me', async (request, reply) => {
		const session = await auth.api.getSession({
			headers: fromNodeHeaders(request.headers),
		});

		if (!session) return reply.status(401).send({ error: 'Unauthorized' });

		return reply.send(session);
	});

	fastify.route({
		method: ['GET', 'POST'],
		url: '/auth/*',
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

				reply.status(response.status);
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