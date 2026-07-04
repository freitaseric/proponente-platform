import { Alert, Button } from '@freitas-ds/react';
import { openUrl } from '@tauri-apps/plugin-opener';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import {
	createDesktopAuthState,
	DESKTOP_AUTH_STATE_KEY,
} from '@/lib/auth-flow';
import constants from '@/lib/constants';

export default function LoginPage() {
	const [error, setError] = useState<string | null>(null);
	const [isOpening, setIsOpening] = useState(false);

	async function handleOpenLogin() {
		setError(null);
		setIsOpening(true);

		try {
			const state = createDesktopAuthState();
			sessionStorage.setItem(DESKTOP_AUTH_STATE_KEY, state);

			const loginURL = new URL('/entrar', constants.webBaseUrl);
			loginURL.searchParams.set('source', 'desktop');
			loginURL.searchParams.set('state', state);

			await openUrl(loginURL.toString());
		} catch {
			setError('Não foi possível abrir o navegador para autenticação.');
		} finally {
			setIsOpening(false);
		}
	}

	return (
		<main className="grid min-h-screen bg-surface lg:grid-cols-[minmax(0,1fr)_440px]">
			<section className="hidden bg-primary text-on-primary lg:flex lg:flex-col lg:justify-between lg:p-12">
				<div className="flex items-center gap-3">
					<img
						src="/icon.ico"
						alt=""
						className="size-10"
					/>
					<span className="text-xl font-semibold">CaptaFlow</span>
				</div>
				<div className="max-w-xl">
					<h1 className="text-4xl font-semibold tracking-normal">
						Gestão de captação com autenticação segura no navegador.
					</h1>
					<p className="mt-4 text-base text-on-primary/80">
						Use sua conta CaptaFlow ou Google no navegador do sistema e volte
						automaticamente para o aplicativo.
					</p>
				</div>
			</section>

			<section className="flex items-center justify-center px-6 py-10">
				<div className="w-full max-w-sm">
					<div className="mb-10 flex items-center gap-3 lg:hidden">
						<img
							src="/icon.ico"
							alt=""
							className="size-9"
						/>
						<span className="text-lg font-semibold">CaptaFlow</span>
					</div>

					<h2 className="text-2xl font-semibold tracking-normal">Entrar</h2>
					<p className="mt-2 text-sm text-muted">
						A autenticação acontece no navegador para suportar email, senha,
						Google e recursos de segurança da sua conta.
					</p>

					{error ? (
						<Alert
							className="mt-6"
							tone="danger"
							title="Falha ao abrir login"
							description={error}
						/>
					) : null}

					<Button
						type="button"
						className="mt-8"
						fullWidth
						loading={isOpening}
						onClick={handleOpenLogin}>
						<ExternalLink className="size-4" />
						Entrar pelo navegador
					</Button>
				</div>
			</section>
		</main>
	);
}
