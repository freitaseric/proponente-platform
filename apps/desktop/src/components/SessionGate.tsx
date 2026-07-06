import type { AuthSession } from '@proponente/contracts/auth';
import { Loader2 } from 'lucide-react';
import { createContext, type ReactNode, useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { authClient } from '@/lib/auth-client';
import { publicEnv } from '@/lib/env';
import { mockAuthSession } from '@/lib/mock-session';

type RouteGateProps = {
	children?: ReactNode;
};

const AuthenticatedSessionContext = createContext<AuthSession | null>(null);

function SessionLoading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background text-primary">
			<Loader2 className="size-6 animate-spin" />
			<span className="sr-only">Carregando sessão</span>
		</div>
	);
}

function AuthenticatedSessionProvider({
	children,
	session,
}: {
	children: ReactNode;
	session: AuthSession;
}) {
	return (
		<AuthenticatedSessionContext.Provider value={session}>
			{children}
		</AuthenticatedSessionContext.Provider>
	);
}

export function useRequiredSession() {
	const session = useContext(AuthenticatedSessionContext);

	if (!session) {
		throw new Error('useRequiredSession must be used within ProtectedRoute.');
	}

	return session;
}

export function ProtectedRoute({ children }: RouteGateProps) {
	if (publicEnv.mockSession) {
		return (
			<AuthenticatedSessionProvider session={mockAuthSession}>
				{children ?? <Outlet />}
			</AuthenticatedSessionProvider>
		);
	}

	return <ProtectedRealRoute>{children}</ProtectedRealRoute>;
}

function ProtectedRealRoute({ children }: RouteGateProps) {
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

	return (
		<AuthenticatedSessionProvider session={session as AuthSession}>
			{children ?? <Outlet />}
		</AuthenticatedSessionProvider>
	);
}

export function GuestRoute({ children }: RouteGateProps) {
	if (publicEnv.mockSession) {
		void mockAuthSession;
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return <GuestRealRoute>{children}</GuestRealRoute>;
}

function GuestRealRoute({ children }: RouteGateProps) {
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

	return children ?? <Outlet />;
}

export function RequireSession({ children }: { children: ReactNode }) {
	return <ProtectedRoute>{children}</ProtectedRoute>;
}

export function RedirectAuthenticated({ children }: { children: ReactNode }) {
	return <GuestRoute>{children}</GuestRoute>;
}
