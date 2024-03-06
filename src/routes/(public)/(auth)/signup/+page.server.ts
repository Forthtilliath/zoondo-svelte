import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { Prisma } from '@prisma/client';
import { userSignupSchema } from '$lib/schemas';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) throw redirect(302, '/');
  return {};
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const parsedData = userSignupSchema.safeParse(Object.fromEntries(formData));

    // form validation checks
    if (!parsedData.success) {
      return fail(400, {
        message: parsedData.error.format()
      });
    }
    const { username, password, email } = parsedData.data;

    try {
      const user = await auth.createUser({
        key: {
          providerId: 'username',
          providerUserId: username.toLowerCase(),
          password
        },
        attributes: {
          username,
          email
        }
      });

      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      });
      locals.auth.setSession(session);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (/email/i.test(e.message)) {
          return fail(400, {
            message: { email: { _errors: ['Email already taken'] }, _errors: [] }
          });
        }
        if (/username/i.test(e.message)) {
          return fail(400, {
            message: { username: { _errors: ['Username already taken'] }, _errors: [] }
          });
        }
      }
      if (e instanceof Error) {
        console.error(e.message);
      }
      return fail(500, {
        message: 'An unknown error occurred'
      });
    }
    throw redirect(302, '/');
  }
};
