import type { AuthSession } from '@proponente/contracts/auth';
import { fromNodeHeaders } from 'better-auth/node';
import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { auth } from '../../shared/auth.js';
import { env } from '../../shared/env.js';

const authRoutes: FastifyPluginAsync = async fastify => {
	fastify.get(
		'/auth/callback/desktop',
		{
			schema: {
				hide: true,
			},
		},
		async (request, reply) => {
			const requestUrl = new URL(request.url, env.API_PUBLIC_URL);
			const state = requestUrl.searchParams.get('state');
			const { token } = await auth.api.generateOneTimeToken({
				headers: fromNodeHeaders(request.headers),
			});
			const redirectUrl = new URL(`/sucesso`, env.WEB_PUBLIC_URL);

			redirectUrl.searchParams.set('token', token);

			if (state) {
				redirectUrl.searchParams.set('state', state);
			}

			return reply.redirect(redirectUrl.toString());
		}
	);

	fastify.get(
		'/auth/@me',
		{
			schema: {
				tags: ['Autenticação'],
				summary: 'Obter sessão autenticada atual',
				response: {
					200: z.looseObject({}),
					401: z.object({
						error: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const session: AuthSession | null = await auth.api.getSession({
				headers: fromNodeHeaders(request.headers),
			});

			if (!session) return reply.status(401).send({ error: 'Unauthorized' });

			return reply.send(session);
		}
	);

	fastify.route({
		method: ['GET', 'POST'],
		url: '/auth/*',
		schema: {
			hide: true,
			response: {
				200: z.any(),
				400: z.any(),
				401: z.any(),
				500: z.any(),
			},
		},
		async handler(request, reply) {
			try {
				const url = new URL(request.url, env.API_PUBLIC_URL);

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
