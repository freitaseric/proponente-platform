import { z } from 'zod';
import { env } from '../../shared/env.js';
import type { FastifyPluginAsync } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import semver from 'semver';

const updaterParamsSchema = z.object({
	target: z.enum(['windows', 'linux', 'darwin']),
	arch: z.enum(['x86_64', 'i686', 'aarch64', 'armv7']),
	currentVersion: z.string().min(1),
});

const latestDesktopRelease = {
	version: '0.1.0',
	pubDate: '2026-06-29T00:00:00Z',
	notes: 'Correções iniciais do CaptaFlow Desktop.',
	platforms: {
		'windows-x86_64': {
			filePath:
				'desktop/0.1.0/windows-x86_64/captaflow-desktop_0.1.0_x64-setup.exe',
			signature: 'COLE_AQUI_O_CONTEUDO_DO_ARQUIVO_.EXE.SIG',
		},
	},
} as const;

type PlatformKey = keyof typeof latestDesktopRelease.platforms;

function getPublicApiUrl(request: {
	protocol: string;
	hostname: string;
}): string {
	return env.API_PUBLIC_URL ?? `${request.protocol}://${request.hostname}`;
}

const updaterRoutes: FastifyPluginAsync = async rawInstance => {
	const fastify = rawInstance.withTypeProvider<ZodTypeProvider>();

	fastify.get(
		'/update/:target/:arch/:currentVersion',
		{
			schema: {
				params: updaterParamsSchema,
				responses: {
					200: z.object({
						version: z.string(),
						pub_date: z.string(),
						url: z.url(),
						signature: z.string,
						notes: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const currentVersion = semver.clean(request.params.currentVersion);
			const latestVersion = semver.clean(latestDesktopRelease.version);

			if (!currentVersion || !latestVersion) return reply.status(204).send();

			if (!semver.gt(latestVersion, currentVersion))
				return reply.status(204).send();

			const platformKey =
				`${request.params.target}-${request.params.arch}` as PlatformKey;
			const platform = latestDesktopRelease.platforms[platformKey];

			if (!platform) {
				return reply.status(204).send();
			}

			const baseUrl = getPublicApiUrl(request);

			return reply.header('Cache-Control', 'no-store').send({
				version: latestDesktopRelease.version,
				pub_date: latestDesktopRelease.pubDate,
				url: `${baseUrl}/downloads/${platform.filePath}`,
				signature: platform.signature,
				notes: latestDesktopRelease.notes,
			});
		}
	);
};

export default updaterRoutes;
