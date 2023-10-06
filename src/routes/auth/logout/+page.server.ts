import { typedRoute } from '$lib/types/appRoutes.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
  default({ cookies }) {
    // eat the cookie
    cookies.set('authorization', '', {
      path: '/',
      expires: new Date(0)
    });

    console.log('deleting cookie');

    // redirect the user
    throw redirect(307, typedRoute('/auth/login'));
  }
};
