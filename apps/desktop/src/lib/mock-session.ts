import type { AuthSession } from '@proponente/contracts/auth';

const now = new Date('2026-01-01T12:00:00.000Z');

export const mockAuthSession: AuthSession = {
	session: {
		id: 'mock-session',
		userId: 'mock-user',
		token: 'mock-token',
		expiresAt: new Date('2099-01-01T00:00:00.000Z'),
		createdAt: now,
		updatedAt: now,
		ipAddress: '127.0.0.1',
		userAgent: 'Proponente Digital Design Mock',
	},
	user: {
		id: 'mock-user',
		name: 'Marina Proponente',
		email: 'marina@proponentedigital.com.br',
		emailVerified: true,
		image: null,
		createdAt: now,
		updatedAt: now,
	},
};
