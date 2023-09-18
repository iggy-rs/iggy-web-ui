import { redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { typedRoute } from '$lib/types/appRoutes';

const register: Action = async ({ cookies, request }) => {
  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');

  console.log('register action');

  cookies.set('session', 'test', {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    maxAge: 60 * 60 * 24 * 30
  });

  // redirect the user
  throw redirect(302, typedRoute('/dashboard/overview'));
};

export const actions: Actions = { register };
