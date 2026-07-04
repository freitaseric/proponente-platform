import {
	AppShell,
	CommandMenu,
	type CommandMenuGroup,
} from '@freitas-ds/react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { AppSidebar } from '@/components/AppSidebar';
import { AppTopbar } from '@/components/AppTopbar';

const commandGroups: CommandMenuGroup[] = [
	{
		label: 'Navegação',
		items: [
			{
				value: 'dashboard',
				label: 'Dashboard',
				description: 'Visão geral da operação',
				shortcut: ['Ctrl', 'D'],
			},
			{
				value: 'produtores',
				label: 'Produtores',
				description: 'Cadastro e acompanhamento de produtores',
			},
			{
				value: 'relatorios',
				label: 'Relatórios',
				description: 'Indicadores e exportações',
			},
		],
	},
	{
		label: 'Sistema',
		items: [
			{
				value: 'configuracoes',
				label: 'Configurações',
				description: 'Preferências e integrações',
				shortcut: ['Ctrl', ','],
			},
		],
	},
];

export default function MainLayout() {
	const [commandOpen, setCommandOpen] = useState(false);

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			const isCommandShortcut =
				(event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';

			if (!isCommandShortcut) {
				return;
			}

			event.preventDefault();
			setCommandOpen(current => !current);
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<>
			<CommandMenu
				open={commandOpen}
				onOpenChange={setCommandOpen}
				groups={commandGroups}
				placeholder="Buscar tela, ação ou configuração..."
			/>
			<AppShell
				sidebar={<AppSidebar />}
				topbar={<AppTopbar onOpenCommand={() => setCommandOpen(true)} />}>
				<Outlet />
			</AppShell>
		</>
	);
}
