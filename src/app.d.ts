import type { User } from 'lucia';

declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest<import('$lib/server/lucia').Auth>;
			user: User;
			// games: import('$lib/server/prisma').Game[];
		}
	}
}

export {};
