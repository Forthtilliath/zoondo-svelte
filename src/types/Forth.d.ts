import type { ActionFailure } from '@sveltejs/kit';
import type { z } from 'zod';

declare global {
	namespace F {
		type ZodActionOutput<T extends z.ZodType> = Promise<
			ActionFailure<{ message: z.inferFormattedError<T> }>
		>;

		type ParsedError = { message: { _errors: string[] } };
    type ActionOutput = Promise<ActionFailure<ParsedError>>;
	}
}

export {};
