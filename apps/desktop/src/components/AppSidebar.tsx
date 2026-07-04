import {
	Card,
	CardContent,
	Sidebar,
	SidebarBrand,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarNavItem,
	SidebarSection,
} from '@freitas-ds/react';
import {
	Building2,
	CreditCard,
	FileText,
	FolderKanban,
	LayoutDashboard,
	Settings,
	ShieldCheck,
	Target,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router';

export function AppSidebar() {
	const location = useLocation();

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarBrand
					title="CaptaFlow"
					icon={
						<img
							src="/icon.ico"
							alt=""
						/>
					}
				/>
			</SidebarHeader>

			<SidebarContent>
				<SidebarSection title="Principal">
					<NavLink to="/">
						<SidebarNavItem
							active={location.pathname === '/'}
							icon={<LayoutDashboard className="size-4" />}>
							Visão Geral
						</SidebarNavItem>
					</NavLink>

					<NavLink to="/organizacoes">
						<SidebarNavItem icon={<Building2 className="size-4" />}>
							Organizações
						</SidebarNavItem>
					</NavLink>

					<NavLink to="/documentos">
						<SidebarNavItem icon={<FileText className="size-4" />}>
							Documentos
						</SidebarNavItem>
					</NavLink>

					<NavLink to="/projetos">
						<SidebarNavItem icon={<FolderKanban className="size-4" />}>
							Projetos
						</SidebarNavItem>
					</NavLink>

					<NavLink to="/oportunidades">
						<SidebarNavItem icon={<Target className="size-4" />}>
							Oportunidades
						</SidebarNavItem>
					</NavLink>
				</SidebarSection>

				<div className="h-6" />

				<SidebarSection title="Sistema">
					<NavLink to="/perfil/assinatura">
						<SidebarNavItem icon={<CreditCard className="size-4" />}>
							Assinatura
						</SidebarNavItem>
					</NavLink>

					<NavLink to="/configuracoes">
						<SidebarNavItem icon={<Settings className="size-4" />}>
							Configurações
						</SidebarNavItem>
					</NavLink>
				</SidebarSection>
			</SidebarContent>

			<SidebarFooter>
				<Card>
					<CardContent>
						<div className="flex flex-row items-start justify-center gap-4">
							<ShieldCheck className="size-8 text-primary" />
							<div className="flex flex-col items-start justify-center">
								<h3 className="fds-body-sm font-bold">Dados protegidos</h3>
								<p className="text-muted fds-caption">
									Seus dados estão seguros e criptografados.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</SidebarFooter>
		</Sidebar>
	);
}
