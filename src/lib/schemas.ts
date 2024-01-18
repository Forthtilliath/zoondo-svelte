import { z } from 'zod';

export const userSchema = z.object({
	username: z.string().min(4).max(31),
	email: z.string().email(),
	password: z.string().min(6).max(255),
	bio: z.string().optional()
});

export const userSignupSchema = userSchema.omit({ bio: true });
export const userSigninSchema = userSchema.pick({ username: true, password: true });

export const gameSchema = z.object({
	players: z.array(z.string()).length(2),
	actions: z.array(z.string()).default([])
});

export const gameCreateSchema = z.object({
	name: z.string().min(4).max(32),
	players: z.array(z.string()).length(1)
});

export const gameJoinSchema = z.object({
	gameId: z.string().uuid()
});