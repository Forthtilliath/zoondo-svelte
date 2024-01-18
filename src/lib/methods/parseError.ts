import { fail, type ActionFailure } from "@sveltejs/kit";

export function parseError(status: number, message: string[]): ActionFailure<F.ParsedError> {
	return fail(status, { message: { _errors: message } });
}
