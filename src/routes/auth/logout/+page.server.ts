import { typedRoute } from '$lib/types/appRoutes.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
  default({ cookies }) {
    // eat the cookie
    cookies.set('authorization', '', {
      path: '/',
      expires: new Date(0)
    });

    // redirect the user
    throw redirect(302, typedRoute('/auth/login'));
  }
};
