import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { typedRoute } from '$lib/types/appRoutes';

const schema = z.object({
  name: z.string().min(1),
  password: z.string().min(5)
});

export const load = async () => {
  const form = await superValidate(schema);

  return { form };
};

export const actions = {
  default: async ({ request, cookies, locals }) => {
    const form = await superValidate(request, schema);

    if (!form.valid) {
      return fail(400, { form });
    }

    if (form.data.name !== 'admin' || form.data.password !== 'admin') {
      return message(form, 'Name or password is not valid', { status: 403 });
    }

    // TODO: fix this
    cookies.set('authorization', 'test', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 60 * 60 * 24 * 30
    });

    locals.user = {
      name: 'admin@admin.pl',
      role: 'admin'
    };

    throw redirect(302, typedRoute('/dashboard/overview'));
  }
} satisfies Actions;
