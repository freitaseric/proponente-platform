import { Spinner } from '@freitas-ds/react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { authClient } from '@/lib/auth-client';

function SessionLoading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-surface">
			<Spinner
				size="lg"
				tone="primary"
			/>
		</div>
	);
}

export function RequireSession({ children }: { children: ReactNode }) {
	const location = useLocation();
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return <SessionLoading />;
	}

	if (!session?.user) {
		return (
			<Navigate
				to="/login"
				replace
				state={{ from: location }}
			/>
		);
	}

	return children;
}

export function RedirectAuthenticated({ children }: { children: ReactNode }) {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return <SessionLoading />;
	}

	if (session?.user) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return children;
}
