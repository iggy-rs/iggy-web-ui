import { fetchApi, handleFetchErrors } from '$lib/api/fetchApi';
import { checkIfPathnameIsPublic, typedRoute } from '$lib/types/appRoutes';
import { tokens } from '$lib/utils/tokens';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleRedirects: Handle = async ({ event, resolve }) => {
  const redirects = [
    {
      from: '/dashboard/',
      to: typedRoute('/dashboard/overview')
    },
    {
      from: '/dashboard',
      to: typedRoute('/dashboard/overview')
    },
    {
      from: '/',
      to: typedRoute('/dashboard/overview')
    }
  ];

  const redirect = redirects.find((r) => r.from === event.url.pathname);

  if (redirect && event.request.method === 'GET') {
    return new Response(null, { status: 307, headers: { Location: redirect.to } });
  }

  return resolve(event);
};

const handleAuth: Handle = async ({ event, resolve }) => {
  const cookies = event.cookies;
  const isPublicPath = checkIfPathnameIsPublic(event.url.pathname);
  const accessToken = cookies.get(tokens.accessToken);
  const refreshToken = cookies.get(tokens.refreshToken);

  if (!accessToken && !refreshToken && isPublicPath) {
    return resolve(event);
  }

  if (!accessToken && !refreshToken && !isPublicPath) {
    return new Response(null, { status: 307, headers: { Location: typedRoute('/auth/sign-in') } });
  }

  if (accessToken && refreshToken && isPublicPath) {
    return new Response(null, {
      status: 307,
      headers: { Location: typedRoute('/dashboard/overview') }
    });
  }

  if (!accessToken && refreshToken) {
    const result = await fetchApi({
      path: '/users/refresh-token',
      method: 'POST',
      body: { refresh_token: refreshToken }
    });

    const { data } = await handleFetchErrors(result, cookies);

    const { access_token, refresh_token } = (data as any).tokens;

    cookies.set(tokens.accessToken, access_token.token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: new Date(access_token.expiry * 1000)
    });

    cookies.set(tokens.refreshToken, refresh_token.token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: new Date(refresh_token.expiry * 1000)
    });

    if (isPublicPath) {
      return new Response(null, {
        status: 307,
        headers: { Location: typedRoute('/dashboard/overview') }
      });
    }
  }

  return resolve(event);
};

export const handle = sequence(handleAuth, handleRedirects);
