import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@proponente/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@proponente/ui/card';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { z } from 'zod';

export const Route = createFileRoute('/sucesso')({
	validateSearch: z.object({
		token: z.string(),
		state: z.string().min(16).optional(),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { state, token } = Route.useSearch();
	const deepLink = useMemo(() => {
		const url = new URL('proponente://auth/callback');
		url.searchParams.set('token', token);

		if (state) {
			url.searchParams.set('state', state);
		}

		return url.toString();
	}, [state, token]);

	useEffect(() => {
		// this will open the app with the token in the query params, which can be used to authenticate the user
		window.open(deepLink, '_self');
	}, [deepLink]);

	return (
		<div className="mx-auto flex min-h-screen max-w-6xl flex-row items-center justify-center gap-16 px-8">
			<Card className="w-full max-w-md shrink-0">
				<CardHeader className="flex flex-col items-center justify-center gap-4 text-center">
					<CheckCircle className="size-32 text-primary" />
					<CardTitle className="text-primary text-2xl">
						Login realizado com sucesso!
					</CardTitle>
					<CardDescription className="text-muted-foreground">
						Sua sessão foi enviada ao aplicativo desktop.
						<br />
						Você já pode fechar esta aba.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						className="w-full flex flex-row items-center justify-center gap-4"
						size="lg"
						asChild>
						<a href={deepLink}>
							<span className="text-xl">Abrir o Proponente Digital</span>
							<ExternalLink className="size-6" />
						</a>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
