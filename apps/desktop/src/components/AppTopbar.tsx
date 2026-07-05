import { Kbd, Topbar, UserMenu } from '@freitas-ds/react';
import type { AuthUser } from '@proponente/contracts/auth';
import { LogOut, Search, Settings, UserIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { authClient } from '@/lib/auth-client';
import { cnCommandButton } from '@/lib/helpers';

export type AppTopbarProps = {
	onOpenCommand: () => void;
};

const fallbackUser: Pick<AuthUser, 'name'> &
	Partial<Pick<AuthUser, 'email' | 'image'>> = {
	name: 'Usuário',
	email: undefined,
	image: undefined,
};

export function AppTopbar({ onOpenCommand }: AppTopbarProps) {
	const navigate = useNavigate();
	const { data: session, error, isPending, refetch } = authClient.useSession();
	const [isSigningOut, setIsSigningOut] = useState(false);

	const user = session?.user ?? fallbackUser;
	const isSessionUnavailable = Boolean(error) || (!isPending && !session?.user);

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

	const userMenuItems = useMemo(
		() => [
			{
				label: 'Perfil',
				icon: <UserIcon className="size-4" />,
				disabled: isSessionUnavailable,
			},
			{
				label: 'Configurações',
				icon: <Settings className="size-4" />,
				shortcut: '⌘,',
				disabled: isSessionUnavailable,
			},
		],
		[isSessionUnavailable]
	);

	const userMenuFooterItems = useMemo(
		() => [
			{
				label: isSigningOut ? 'Saindo...' : 'Sair',
				icon: <LogOut className="size-4" />,
				tone: 'danger' as const,
				disabled: isSigningOut || isSessionUnavailable,
				onSelect: handleSignOut,
			},
		],
		[handleSignOut, isSessionUnavailable, isSigningOut]
	);

	return (
		<Topbar
			start={
				<button
					type="button"
					onClick={onOpenCommand}
					className={cnCommandButton()}>
					<span className="flex min-w-0 items-center gap-2">
						<Search className="size-4 shrink-0 text-muted-foreground" />
						<span className="truncate">Buscar ou executar ação...</span>
					</span>

					<span className="ml-auto hidden items-center gap-1 sm:flex">
						<Kbd>Ctrl</Kbd>
						<Kbd>K</Kbd>
					</span>
				</button>
			}
			end={
				!isPending &&
				session?.user && (
					<UserMenu
						name={user.name}
						email={user.email}
						avatarUrl={user.image ?? undefined}
						items={userMenuItems}
						footerItems={userMenuFooterItems}
					/>
				)
			}
		/>
	);
}
