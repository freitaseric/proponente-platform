import { Link } from '@tanstack/react-router';
import { Button } from '@proponente/ui/button';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@proponente/ui/navigation-menu';
import {
	BadgeCheck,
	BellRing,
	BookOpen,
	Briefcase,
	Building2,
	CalendarClock,
	CalendarDays,
	ChartLine,
	ClipboardCheck,
	FileSearch,
	FileText,
	Info,
	Landmark,
	LayoutTemplate,
	LockKeyhole,
	Mail,
	ScrollText,
	Search,
	Users,
} from 'lucide-react';

const solutions = [
	{
		title: 'Monitoramento de editais',
		description: 'Encontre oportunidades alinhadas a sua atuação.',
		icon: Search,
		href: '/#solucoes-monitoramento-editais',
	},
	{
		title: 'Gestão de propostas',
		description: 'Organize elaboração, análise e envio de projetos.',
		icon: FileText,
		href: '/#solucoes-gestao-propostas',
	},
	{
		title: 'Controle de prazos',
		description: 'Acompanhe datas críticas sem perder etapas.',
		icon: CalendarClock,
		href: '/#solucoes-controle-prazos',
	},
	{
		title: 'Gestão de recursos captados',
		description: 'Controle valores, repasses e execução financeira.',
		icon: ChartLine,
		href: '/#solucoes-recursos-captados',
	},
	{
		title: 'Execução e prestação de contas',
		description: 'Reúna comprovações, relatórios e entregas finais.',
		icon: ClipboardCheck,
		href: '/#solucoes-prestacao-contas',
	},
];

const resources = [
	{
		title: 'Banco de editais',
		icon: FileSearch,
		href: '/#recursos-banco-editais',
	},
	{
		title: 'Pipeline de projetos',
		icon: LayoutTemplate,
		href: '/#recursos-pipeline-projetos',
	},
	{
		title: 'Calendário de prazos',
		icon: CalendarClock,
		href: '/#recursos-calendario-prazos',
	},
	{
		title: 'Documentos e anexos',
		icon: FileText,
		href: '/#recursos-documentos-anexos',
	},
	{
		title: 'Indicadores financeiros',
		icon: ChartLine,
		href: '/#recursos-indicadores-financeiros',
	},
	{ title: 'Relatórios', icon: ScrollText, href: '/#recursos-relatorios' },
	{
		title: 'Organizações e contatos',
		icon: Building2,
		href: '/#recursos-organizacoes-contatos',
	},
	{
		title: 'Alertas e notificações',
		icon: BellRing,
		href: '/#recursos-alertas-notificacoes',
	},
];

const audiences = [
	{
		title: 'Captadores de recursos',
		icon: Briefcase,
		href: '/#para-quem-captadores',
	},
	{
		title: 'OSCs e associações',
		icon: Users,
		href: '/#para-quem-oscs-associacoes',
	},
	{ title: 'Prefeituras', icon: Landmark, href: '/#para-quem-prefeituras' },
	{
		title: 'Consultores de projetos',
		icon: BadgeCheck,
		href: '/#para-quem-consultores',
	},
	{
		title: 'Equipes administrativas',
		icon: Building2,
		href: '/#para-quem-equipes-administrativas',
	},
];

const contentLinks = [
	{
		title: 'Guias de captação',
		icon: BookOpen,
		href: '/conteudos#conteudos-guias',
	},
	{
		title: 'Modelos de projetos',
		icon: LayoutTemplate,
		href: '/conteudos#conteudos-modelos',
	},
	{
		title: 'Calendário de editais',
		icon: CalendarDays,
		href: '/conteudos#conteudos-calendario',
	},
	{ title: 'Blog', icon: ScrollText, href: '/conteudos#conteudos-blog' },
];

const companyLinks = [
	{ title: 'Sobre o Proponente Digital', icon: Info, href: '/sobre#sobre' },
	{ title: 'Segurança', icon: LockKeyhole, href: '/sobre#seguranca' },
	{ title: 'Contato', icon: Mail, href: '/sobre#contato' },
];

export const AppHeader = () => {
	return (
		<header className="sticky top-0 z-50 border-b border-transparent bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/85">
			<div className="mx-auto flex h-22 max-w-376 items-center justify-between gap-8 px-8">
				<Link
					className="flex min-w-64 flex-row items-center gap-3"
					to="/">
					<img
						src="/favicon.ico"
						alt=""
						className="size-14 rounded-full"
					/>
					<span className="text-3xl font-bold tracking-normal text-primary">
						Proponente Digital
					</span>
				</Link>

				<NavigationMenu
					className="hidden flex-none lg:flex"
					viewport={false}>
					<NavigationMenuList className="gap-4">
						<NavigationMenuItem>
							<NavigationMenuTrigger className="rounded-md px-0 text-base font-medium text-foreground hover:bg-transparent data-open:bg-transparent data-popup-open:bg-transparent">
								Soluções
							</NavigationMenuTrigger>
							<NavigationMenuContent
								className="p-4"
								style={{ minWidth: '480px', width: '480px' }}>
								<div className="mb-3 rounded-md bg-accent/45 p-4">
									<p className="text-sm font-semibold text-primary">Soluções</p>
									<p className="mt-1 text-sm leading-6 text-muted-foreground">
										Organize todo o fluxo da captação, da oportunidade até a
										comprovação final.
									</p>
								</div>
								<div className="grid gap-1">
									{solutions.map(item => (
										<NavigationMenuLink
											key={item.title}
											asChild
											className="items-start gap-3 rounded-md p-3">
											<a href={item.href}>
												<item.icon className="mt-0.5 size-5 text-primary" />
												<span>
													<span className="block text-sm font-semibold">
														{item.title}
													</span>
													<span className="mt-0.5 block text-sm leading-5 text-muted-foreground">
														{item.description}
													</span>
												</span>
											</a>
										</NavigationMenuLink>
									))}
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger className="rounded-md px-0 text-base font-medium text-foreground hover:bg-transparent data-open:bg-transparent data-popup-open:bg-transparent">
								Recursos
							</NavigationMenuTrigger>
							<NavigationMenuContent
								className="p-4"
								style={{ minWidth: '520px', width: '520px' }}>
								<div className="grid grid-cols-2 gap-1">
									{resources.map(item => (
										<NavigationMenuLink
											key={item.title}
											asChild
											className="gap-3 rounded-md p-3">
											<a href={item.href}>
												<item.icon className="size-5 text-primary" />
												<span className="text-sm font-semibold">
													{item.title}
												</span>
											</a>
										</NavigationMenuLink>
									))}
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger className="rounded-md px-0 text-base font-medium text-foreground hover:bg-transparent data-open:bg-transparent data-popup-open:bg-transparent">
								Para quem
							</NavigationMenuTrigger>
							<NavigationMenuContent
								className="p-4"
								style={{ minWidth: '360px', width: '360px' }}>
								<div className="grid gap-1">
									{audiences.map(item => (
										<NavigationMenuLink
											key={item.title}
											asChild
											className="gap-3 rounded-md p-3">
											<a href={item.href}>
												<item.icon className="size-5 text-primary" />
												<span className="text-sm font-semibold">
													{item.title}
												</span>
											</a>
										</NavigationMenuLink>
									))}
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className="rounded-md px-0 text-base font-medium text-foreground hover:bg-transparent">
								<Link to="/planos">Planos</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger className="rounded-md px-0 text-base font-medium text-foreground hover:bg-transparent data-open:bg-transparent data-popup-open:bg-transparent">
								Conteúdos
							</NavigationMenuTrigger>
							<NavigationMenuContent
								className="p-4"
								style={{ minWidth: '320px', width: '320px' }}>
								<div className="grid gap-1">
									{contentLinks.map(item => (
										<NavigationMenuLink
											key={item.title}
											asChild
											className="gap-3 rounded-md p-3">
											<a href={item.href}>
												<item.icon className="size-5 text-primary" />
												<span className="text-sm font-semibold">
													{item.title}
												</span>
											</a>
										</NavigationMenuLink>
									))}
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger className="rounded-md px-0 text-base font-medium text-foreground hover:bg-transparent data-open:bg-transparent data-popup-open:bg-transparent">
								Sobre
							</NavigationMenuTrigger>
							<NavigationMenuContent
								className="p-4"
								style={{ minWidth: '280px', width: '280px' }}>
								<div className="grid gap-1">
									{companyLinks.map(item => (
										<NavigationMenuLink
											key={item.title}
											asChild
											className="gap-3 rounded-md p-3">
											<a href={item.href}>
												<item.icon className="size-5 text-primary" />
												<span className="text-sm font-semibold">
													{item.title}
												</span>
											</a>
										</NavigationMenuLink>
									))}
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<div className="flex flex-row items-center gap-5">
					<Button
						variant="outline"
						className="h-12 min-w-28 rounded-md border-primary bg-white px-8 text-base font-semibold text-primary hover:bg-accent"
						asChild>
						<Link to="/entrar">Entrar</Link>
					</Button>
					<Button
						className="h-12 min-w-52 rounded-md bg-primary px-8 text-base font-semibold text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90"
						asChild>
						<a href="/#demonstracao">Solicitar demonstração</a>
					</Button>
				</div>
			</div>
		</header>
	);
};
