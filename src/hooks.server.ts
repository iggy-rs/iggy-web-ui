import { fetchApi } from '$lib/api/fetchApi';
import { handleFetchErrors } from '$lib/api/handleFetchErrors';
import { checkIfPathnameIsPublic, typedRoute } from '$lib/types/appRoutes';
import { dataHas } from '$lib/utils/dataHas';
import { tokens } from '$lib/utils/constants/tokens';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Actions } from '@sveltejs/kit';

const accessTokenOkRedirects = [
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
  },
  {
    from: '/auth',
    to: typedRoute('/dashboard/overview')
  },
  {
    from: typedRoute('/auth/sign-in'),
    to: typedRoute('/dashboard/overview')
  }
];

const handleAuth: Handle = async ({ event, resolve }) => {
  const cookies = event.cookies;
  const isPublicPath = checkIfPathnameIsPublic(event.url.pathname);
  const accessToken = cookies.get(tokens.accessToken);
  const refreshToken = cookies.get(tokens.refreshToken);

  if (accessToken) {
    const invalidPathRedirect = accessTokenOkRedirects.find((r) => r.from === event.url.pathname);
    if (invalidPathRedirect) throw redirect(302, invalidPathRedirect.to);
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
      expires: new Date(access_token.expiry)
    });

    cookies.set(tokens.refreshToken, refresh_token.token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: new Date(refresh_token.expiry)
    });

    const invalidPathRedirect = accessTokenOkRedirects.find((r) => r.from === event.url.pathname);

    if (invalidPathRedirect) throw redirect(302, invalidPathRedirect.to);
  }

  if (!accessToken && !refreshToken) {
    if (isPublicPath) {
      return resolve(event);
    } else {
      throw redirect(302, typedRoute('/auth/sign-in'));
    }
  }

  return resolve(event);
};

export const handle = sequence(handleAuth);
