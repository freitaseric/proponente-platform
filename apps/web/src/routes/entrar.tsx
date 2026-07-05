import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import {
	ChartLine,
	Eye,
	EyeOff,
	Lock,
	Mail,
	ShieldCheck,
	Users,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '#components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '#components/ui/card';
import { Checkbox } from '#components/ui/checkbox';
import { Input } from '#components/ui/input';
import { Label } from '#components/ui/label';
import { Separator } from '#components/ui/separator';
import { authClient } from '#lib/authClient';
import constants from '#lib/constants';
import {
	type SignInEmailResult,
	type SignInWithGoogleResult,
	signInEmail,
	signInWithGoogle,
} from '#lib/helpers';

export const Route = createFileRoute('/entrar')({
	beforeLoad: async ctx => {
		const { data: session } = await authClient.getSession();

		if (!session) return;

		if (ctx.search.source === 'desktop') {
			const callbackUrl = new URL(
				'/auth/callback/desktop',
				constants.backendBaseUrl
			);

			if (ctx.search.state) {
				callbackUrl.searchParams.set('state', ctx.search.state);
			}

			throw redirect({
				href: callbackUrl.toString(),
			});
		}

		throw redirect({ to: '/' });
	},
	validateSearch: z.object({
		source: z.enum(['desktop']).optional(),
		state: z.string().min(16).optional(),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { source, state } = Route.useSearch();

	const [isPasswordHidden, setIsPasswordHidden] = useState(true);

	const callbackURL =
		source === 'desktop'
			? (() => {
					const url = new URL(
						'/auth/callback/desktop',
						constants.backendBaseUrl
					);

					if (state) {
						url.searchParams.set('state', state);
					}

					return url.toString();
				})()
			: '/';

	const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);

		toast.promise<SignInEmailResult>(
			signInEmail({
				email: data.get('email') as string,
				password: data.get('password') as string,
				rememberMe: data.get('rememberMe') === 'on',
				callbackURL,
			}),
			{
				loading: 'Entrando...',
				success: 'Login realizado com sucesso!',
				error: data => `${data.message ?? 'Ocorreu um erro ao tentar entrar.'}`,
			}
		);
	};

	const handleGoogleLogin = () =>
		toast.promise<SignInWithGoogleResult>(
			signInWithGoogle({
				callbackURL,
			}),
			{
				loading: 'Entrando...',
				success: 'Login realizado com sucesso!',
				error: data => `${data.message ?? 'Ocorreu um erro ao tentar entrar.'}`,
			}
		);

	return (
		<div className="mx-auto flex min-h-screen max-w-6xl flex-row items-center justify-between gap-16 px-8">
			<section className="flex max-w-xl flex-col items-start justify-center gap-8">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-bold">Entrar no Proponente Digital</h1>
					<p className="text-muted-foreground">
						Acesse sua conta para continuar gerenciando seus projetos, propostas
						e oportunidades.
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex flex-row items-center gap-3">
						<ChartLine className="size-12 text-primary" />
						<div className="flex flex-col gap-1 max-w-80">
							<h3 className="text-xl font-semibold">
								Visão completa do seu funil
							</h3>
							<p className="text-muted-foreground">
								Acompanhe seus projetos e oportunidades em um só lugar.
							</p>
						</div>
					</div>

					<div className="flex flex-row items-center gap-3">
						<Users className="size-12 text-primary" />
						<div className="flex flex-col gap-1 max-w-80">
							<h3 className="text-xl font-semibold">Mais produtividade</h3>
							<p className="text-muted-foreground">
								Automatize tarefas e ganhe tempo para focar no que importa.
							</p>
						</div>
					</div>

					<div className="flex flex-row items-center gap-3">
						<ShieldCheck className="size-12 text-primary" />
						<div className="flex flex-col gap-1 max-w-80">
							<h3 className="text-xl font-semibold">
								Segurança e confiabilidade
							</h3>
							<p className="text-muted-foreground">
								Seus dados protegidos com criptografia e backups diários.
							</p>
						</div>
					</div>
				</div>
			</section>
			<Card className="w-full max-w-md shrink-0">
				<CardHeader className="flex flex-col items-center text-center">
					<CardTitle>Entrar na conta</CardTitle>
					<CardDescription>
						Use seu e-mail e senha para acessar.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<form
						className="flex flex-col gap-4"
						onSubmit={handleLogin}>
						<div className="flex flex-col gap-2">
							<Label htmlFor="email">E-mail</Label>
							<div className="relative">
								<Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									required
									type="email"
									id="email"
									name="email"
									placeholder="seu@email.com"
									className="pl-10"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="password">Senha</Label>
							<div className="relative">
								<Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

								<Input
									required
									type={isPasswordHidden ? 'password' : 'text'}
									id="password"
									name="password"
									placeholder="••••••••"
									className="px-10"
								/>

								<Button
									type="button"
									variant="ghost"
									aria-label="Mostrar senha"
									className="absolute right-1 top-1/2 size-9 -translate-y-1/2 text-muted-foreground hover:text-foreground"
									onClick={() => setIsPasswordHidden(!isPasswordHidden)}>
									{isPasswordHidden && <Eye className="size-4" />}
									{!isPasswordHidden && <EyeOff className="size-4" />}
								</Button>
							</div>
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-row items-center gap-4">
									<Checkbox
										name="rememberMe"
										defaultChecked
									/>
									<span>Lembrar de mim</span>
								</div>
								<Button
									variant="link"
									asChild>
									<Link to="/trocar-senha">Esqueci minha senha</Link>
								</Button>
							</div>
							<Button type="submit">Entrar</Button>
						</div>
					</form>
					<Separator />
					<div className="flex flex-col gap-2">
						<Button
							variant="outline"
							onClick={handleGoogleLogin}>
							<svg viewBox="0 0 128 128">
								<title>Google</title>
								<path
									fill="#fff"
									d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"></path>
								<path
									fill="#e33629"
									d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"></path>
								<path
									fill="#f8bd00"
									d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"></path>
								<path
									fill="#587dbd"
									d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"></path>
								<path
									fill="#319f43"
									d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"></path>
							</svg>
							<span>Continuar com Google</span>
						</Button>
					</div>
				</CardContent>
				<CardFooter className="flex flex-row items-center justify-center">
					<span>Ainda não tem uma conta? </span>
					<Button
						variant="link"
						asChild>
						<Link
							to="/cadastrar"
							search={{ source, state }}>
							Cadastrar-se
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
