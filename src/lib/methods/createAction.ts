import type { z } from 'zod';
import { parseError } from './parseError';

type ParseDataInput<T extends z.ZodType, U = z.TypeOf<T>> = {
	request: Request;
	schema: T;
	callback: (data: z.SafeParseSuccess<U>['data']) => F.ZodActionOutput<T>;
};

export async function createAction<T extends z.ZodType>({
	request,
	schema,
	callback
}: ParseDataInput<T>): F.ActionOutput {
	const formData = await request.formData();
	const parsedData = schema.safeParse(Object.fromEntries(formData));

	if (!parsedData.success) {
		return parseError(400, parsedData.error.format()._errors);
	}
	return callback(parsedData.data);
}
