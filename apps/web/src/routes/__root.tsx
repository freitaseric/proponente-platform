import { createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from '@proponente/ui/sonner';
import type React from 'react';
import { AppHeader } from '#components/AppHeader';

export const Route = createRootRoute({
	shellComponent: RouteComponent,
});

function RouteComponent({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AppHeader />
			{children}
			<Toaster />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
