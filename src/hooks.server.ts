import { env } from '$env/dynamic/public';
import { fetchApi } from '$lib/api/fetchApi';
import { checkIfPathnameIsPublic, typedRoute } from '$lib/types/appRoutes';
import { tokens } from '$lib/utils/constants/tokens';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Actions } from '@sveltejs/kit';

console.log(`IggyAPI URL: ${env.PUBLIC_IGGY_API_URL}`)

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

  if (!accessToken) {
    if (isPublicPath) {
      return resolve(event);
    } else {
      redirect(302, typedRoute('/auth/sign-in'));
    }
  }

  const invalidPathRedirect = accessTokenOkRedirects.find((r) => r.from === event.url.pathname);
  if (invalidPathRedirect) {
    redirect(302, invalidPathRedirect.to);
  }

  return resolve(event);
};

export const handle = sequence(handleAuth);
