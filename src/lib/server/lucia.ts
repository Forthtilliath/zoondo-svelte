import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { prisma } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';

const client = new PrismaClient();

export const auth = lucia({
	adapter: prisma(client),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),

	getUserAttributes: (data) => {
		return {
			username: data.username,
			email: data.email,
			bio: data.bio
		};
	},
	sessionCookie: {
		expires: false // false -> 1 year
	}
});

export type Auth = typeof auth;
