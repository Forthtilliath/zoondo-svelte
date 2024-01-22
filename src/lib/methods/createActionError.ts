import { fail, type ActionFailure } from '@sveltejs/kit';

export function createActionError(status: number, message: string[]): ActionFailure<F.ParsedError> {
	return fail(status, { message: { _errors: message } });
}

export function createActionCustomError(
	status: number,
	message: string[],
	name: string
): ActionFailure<F.ParsedError> {
	return fail(status, {
		message: { [name]: { _errors: message }, _errors: [] }
	});
}
