import { typedRoute } from '$lib/types/appRoutes';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handleError: HandleServerError = ({ error, event }) => {
  // example integration with https://sentry.io/

  console.log('error handler', error);

  return {
    message: 'Whoops!',
    code: 500
  };
};

const handleRedirects: Handle = async ({ event, resolve }) => {
  const redirects = [
    {
      from: '/logout',
      to: '/dashboard/overview'
    },
    {
      from: '/auth',
      to: '/dashboard/overview'
    },
    {
      from: '/dashboard',
      to: '/dashboard/overview'
    },
    {
      from: '/',
      to: '/dashboard/overview'
    }
  ];

  const redirect = redirects.find((r) => r.from === event.url.pathname);

  if (redirect && event.request.method === 'GET') {
    return new Response(null, { status: 302, headers: { Location: redirect.to } });
  }

  const response = await resolve(event);
  return response;
};

const handleAuth: Handle = async ({ event, resolve }) => {
  const authCookie = event.cookies.get('authorization');
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/reset-password'];

  const path = event.url.pathname;

  if (!authCookie && !publicRoutes.includes(path)) {
    return new Response(null, { status: 307, headers: { Location: typedRoute('/auth/login') } });
  }

  if (authCookie && publicRoutes.includes(path)) {
    return new Response(null, {
      status: 307,
      headers: { Location: typedRoute('/dashboard/overview') }
    });
  }

  return resolve(event);
};

export const handle = sequence(handleRedirects, handleAuth);
