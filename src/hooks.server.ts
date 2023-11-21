import { fetchApi } from '$lib/api/fetchApi';
import { handleFetchErrors } from '$lib/api/handleFetchErrors';
import { checkIfPathnameIsPublic, typedRoute } from '$lib/types/appRoutes';
import { dataHas } from '$lib/utils/dataHas';
import { tokens } from '$lib/utils/tokens';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleAuth: Handle = async ({ event, resolve }) => {
  console.log('handle auth');
  const cookies = event.cookies;
  const isPublicPath = checkIfPathnameIsPublic(event.url.pathname);
  const accessToken = cookies.get(tokens.accessToken);
  const refreshToken = cookies.get(tokens.refreshToken);

  const refreshTokens = async (token: string) => {
    console.log('sending refresh token', token, event.url.pathname);

    const result = await fetchApi({
      path: '/users/refresh-token',
      method: 'POST',
      body: { refresh_token: token }
    });

    const { data } = await handleFetchErrors(result, cookies);
    console.log('sending refresh token', data);

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
  };

  if (isPublicPath) {
    if (accessToken && refreshToken) {
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
    }

    if (!accessToken && refreshToken) {
      await refreshTokens(refreshToken);
      return resolve(event);
    }

    if (!accessToken && !refreshToken) {
      return resolve(event);
    }
  } else {
    if (!accessToken && refreshToken) {
      await refreshTokens(refreshToken);
      return resolve(event);
    }

    if (!accessToken && !refreshToken) {
      return new Response(null, {
        status: 307,
        headers: { Location: typedRoute('/auth/sign-in') }
      });
    }
  }

  crypto.randomUUID()
  return resolve(event);
};

export const handle = handleAuth;
