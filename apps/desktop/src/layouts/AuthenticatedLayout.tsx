import {
	Building2,
	CreditCard,
	FileText,
	FolderKanban,
	LayoutDashboard,
	LogOut,
	Settings,
	ShieldCheck,
	Target,
	type LucideIcon,
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { useRequiredSession } from '@/components/SessionGate';
import { Button } from '@proponente/ui/button';
import { Separator } from '@proponente/ui/separator';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
} from '@proponente/ui/sidebar';
import { authClient } from '@/lib/auth-client';

type NavigationItem = {
	icon: LucideIcon;
	label: string;
	to: string;
	disabled?: boolean;
};

const primaryNavigation: NavigationItem[] = [
	{
		icon: LayoutDashboard,
		label: 'Visão geral',
		to: '/',
	},
	{
		icon: Building2,
		label: 'Organizações',
		to: '/organizacoes',
		disabled: true,
	},
	{
		icon: FileText,
		label: 'Documentos',
		to: '/documentos',
		disabled: true,
	},
	{
		icon: FolderKanban,
		label: 'Projetos',
		to: '/projetos',
		disabled: true,
	},
	{
		icon: Target,
		label: 'Oportunidades',
		to: '/oportunidades',
		disabled: true,
	},
];

const systemNavigation: NavigationItem[] = [
	{
		icon: CreditCard,
		label: 'Assinatura',
		to: '/perfil/assinatura',
		disabled: true,
	},
	{
		icon: Settings,
		label: 'Configurações',
		to: '/configuracoes',
		disabled: true,
	},
];

export default function AuthenticatedLayout() {
	const session = useRequiredSession();
	const navigate = useNavigate();
	const { refetch } = authClient.useSession();
	const [isSigningOut, setIsSigningOut] = useState(false);

	const handleSignOut = useCallback(async () => {
		if (isSigningOut) {
			return;
		}

		setIsSigningOut(true);

		try {
			await authClient.signOut();
			await refetch();
			navigate('/login', { replace: true });
		} finally {
			setIsSigningOut(false);
		}
	}, [isSigningOut, navigate, refetch]);

	const initials = getInitials(session.user.name);

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur">
					<div className="flex min-w-0 items-center gap-3">
						<SidebarTrigger />
						<Separator
							orientation="vertical"
							className="h-5"
						/>
						<div className="min-w-0">
							<p className="truncate text-sm font-medium">Visão geral</p>
							<p className="hidden truncate text-xs text-muted-foreground sm:block">
								Operação de captação
							</p>
						</div>
					</div>

					<div className="flex min-w-0 items-center gap-3">
						<div className="hidden min-w-0 flex-col text-right sm:flex">
							<span className="truncate text-xs font-medium">
								{session.user.name}
							</span>
							<span className="truncate text-xs text-muted-foreground">
								{session.user.email}
							</span>
						</div>
						<div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary text-xs font-semibold text-primary-foreground">
							{session.user.image ? (
								<img
									src={session.user.image}
									alt=""
									className="size-full object-cover"
								/>
							) : (
								initials
							)}
						</div>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							aria-label="Sair"
							disabled={isSigningOut}
							onClick={handleSignOut}>
							<LogOut className="size-4" />
						</Button>
					</div>
				</header>

				<div className="flex min-h-0 flex-1 flex-col p-4">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

function AppSidebar() {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<NavLink
					to="/"
					className="flex min-w-0 items-center gap-2 rounded-md p-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
					<img
						src="/icon.ico"
						alt=""
						className="size-8 shrink-0 rounded-sm"
					/>
					<span className="truncate text-sm font-semibold group-data-[collapsible=icon]:hidden">
						Proponente Digital
					</span>
				</NavLink>
			</SidebarHeader>
			<SidebarContent>
				<NavigationSection
					title="Principal"
					items={primaryNavigation}
				/>
				<SidebarSeparator />
				<NavigationSection
					title="Sistema"
					items={systemNavigation}
				/>
			</SidebarContent>
			<SidebarFooter>
				<div className="rounded-md border border-sidebar-border bg-sidebar-accent p-3 text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden">
					<div className="flex items-start gap-3">
						<ShieldCheck className="mt-0.5 size-5 shrink-0" />
						<div className="min-w-0">
							<p className="text-xs font-semibold">Dados protegidos</p>
							<p className="mt-1 text-xs leading-5 text-sidebar-foreground/75">
								Sessão ativa e acesso restrito às rotas autenticadas.
							</p>
						</div>
					</div>
				</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

function NavigationSection({
	items,
	title,
}: {
	items: NavigationItem[];
	title: string;
}) {
	const location = useLocation();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>{title}</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map(item => (
						<SidebarMenuItem key={item.to}>
							<NavigationMenuItem
								item={item}
								active={isRouteActive(location.pathname, item.to)}
							/>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}

function NavigationMenuItem({
	active,
	item,
}: {
	active: boolean;
	item: NavigationItem;
}) {
	const Icon = item.icon;

	if (item.disabled) {
		return (
			<>
				<SidebarMenuButton
					disabled
					tooltip={`${item.label} em breve`}>
					<Icon className="size-4" />
					<span>{item.label}</span>
				</SidebarMenuButton>
				<SidebarMenuBadge>Em breve</SidebarMenuBadge>
			</>
		);
	}

	return (
		<SidebarMenuButton
			asChild
			isActive={active}
			tooltip={item.label}>
			<NavLink
				to={item.to}
				end={item.to === '/'}>
				<Icon className="size-4" />
				<span>{item.label}</span>
			</NavLink>
		</SidebarMenuButton>
	);
}

function isRouteActive(pathname: string, to: string) {
	if (to === '/') {
		return pathname === '/';
	}

	return pathname === to || pathname.startsWith(`${to}/`);
}

function getInitials(name: string) {
	const initials = name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map(part => part[0]?.toUpperCase())
		.join('');

	return initials || 'U';
}
