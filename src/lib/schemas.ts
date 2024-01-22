import { z } from 'zod';

// User
export const userSchema = z.object({
	username: z.string().min(4).max(32),
	email: z.string().email(),
	password: z.string().min(6).max(255),
	bio: z.string().optional()
});

// Auth
export const userSignupSchema = userSchema.omit({ bio: true });
export const userSigninSchema = userSchema.pick({ username: true, password: true });

// Game
export const gameSchema = z.object({
	players: z.array(z.string()).length(2),
	actions: z.array(z.string()).default([])
});

export const gameCreateSchema = z.object({
	gameName: z.string().min(4).max(32),
	friendName: z.string()
});

export const gameJoinSchema = z.object({
	gameId: z.string().uuid()
});