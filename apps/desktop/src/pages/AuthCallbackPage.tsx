import type { DesktopAuthCallbackQuery } from '@proponente/contracts/auth';
import { Alert, Button, Spinner } from '@freitas-ds/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router';
import { authClient } from '@/lib/auth-client';
import { DESKTOP_AUTH_STATE_KEY } from '@/lib/auth-flow';

type CallbackStatus = 'pending' | 'success' | 'error';

export default function AuthCallbackPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { refetch } = authClient.useSession();
	const [status, setStatus] = useState<CallbackStatus>('pending');
	const [message, setMessage] = useState<string | null>(null);
	const hasStartedVerification = useRef(false);

	const callbackQuery: DesktopAuthCallbackQuery = useMemo(
		() => ({
			token: searchParams.get('token') ?? undefined,
			state: searchParams.get('state') ?? undefined,
		}),
		[searchParams]
	);
	const token = callbackQuery.token;
	const state = callbackQuery.state;

	useEffect(() => {
		let isMounted = true;

		async function verifyToken() {
			if (hasStartedVerification.current) {
				return;
			}

			hasStartedVerification.current = true;

			const expectedState = sessionStorage.getItem(DESKTOP_AUTH_STATE_KEY);

			if (!state || !expectedState || state !== expectedState) {
				sessionStorage.removeItem(DESKTOP_AUTH_STATE_KEY);
				setStatus('error');
				setMessage('O retorno de autenticação não corresponde a este aplicativo.');
				return;
			}

			if (!token) {
				sessionStorage.removeItem(DESKTOP_AUTH_STATE_KEY);
				setStatus('error');
				setMessage('O retorno de autenticação não trouxe um token válido.');
				return;
			}

			try {
				await authClient.oneTimeToken.verify({ token });
				sessionStorage.removeItem(DESKTOP_AUTH_STATE_KEY);
				await refetch();

				if (!isMounted) {
					return;
				}

				setStatus('success');
				navigate('/', { replace: true });
			} catch {
				if (!isMounted) {
					return;
				}

				setStatus('error');
				setMessage('Não foi possível concluir a autenticação no aplicativo.');
			}
		}

		void verifyToken();

		return () => {
			isMounted = false;
		};
	}, [navigate, refetch, state, token]);

	if (status === 'success') {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-surface px-6">
			<div className="w-full max-w-sm">
				{status === 'pending' ? (
					<div className="flex flex-col items-center text-center">
						<Spinner
							size="lg"
							tone="primary"
						/>
						<h1 className="mt-6 text-xl font-semibold tracking-normal">
							Concluindo autenticação
						</h1>
						<p className="mt-2 text-sm text-muted">
							Aguarde enquanto vinculamos sua sessão ao aplicativo.
						</p>
					</div>
				) : (
					<>
						<Alert
							tone="danger"
							title="Login não concluído"
							description={message ?? undefined}
						/>
						<Button
							type="button"
							className="mt-6"
							fullWidth
							onClick={() => navigate('/login', { replace: true })}>
							Voltar ao login
						</Button>
					</>
				)}
			</div>
		</main>
	);
}
