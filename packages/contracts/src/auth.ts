export type AuthUser = {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image?: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type AuthSessionRecord = {
	id: string;
	userId: string;
	token: string;
	expiresAt: Date;
	createdAt: Date;
	updatedAt: Date;
	ipAddress?: string | null;
	userAgent?: string | null;
};

export type AuthSession = {
	session: AuthSessionRecord;
	user: AuthUser;
};

export type AuthMeResponse = AuthSession;

export type AuthUnauthorizedResponse = {
	error: 'Unauthorized';
};

export type DesktopAuthCallbackQuery = {
	token?: string;
	state?: string;
};

export type DesktopAuthCallbackUrl = `proponente://auth/callback?${string}`;

export type DesktopAuthStartQuery = {
	source?: 'desktop';
	state?: string;
};

export type DesktopAuthCompleteQuery = {
	token: string;
	state?: string;
};

export type OneTimeTokenVerifyRequest = {
	token: string;
};
