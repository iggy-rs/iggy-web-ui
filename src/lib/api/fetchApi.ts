import { API_URL } from '$env/static/private';
import type { ApiSchema } from '$lib/api/ApiSchema';
import { typedRoute } from '$lib/types/appRoutes';
import { tokens } from '$lib/utils/tokens';
import { error, type Cookies, redirect } from '@sveltejs/kit';

export const getJson = async (res: Response): Promise<unknown | null> => {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    return json as unknown;
  } catch (err) {
    return null;
  }
};

export async function fetchApi(
  args: ApiSchema & { urlParams?: Record<string, string>; cookies?: Cookies }
): Promise<Response | unknown> {
  const { path, method, urlParams, cookies } = args;

  try {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    if (cookies) {
      const accessToken = cookies.get(tokens.accessToken);
      if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
    }

    let fullUrl = `${API_URL}${path}`;

    if (urlParams) {
      const query = new URLSearchParams(Object.entries(urlParams));
      fullUrl += '?' + query.toString();
    }

    const result = await fetch(fullUrl, {
      headers,
      method,
      ...('body' in args ? { body: JSON.stringify(args.body) } : {})
    });

    return result;
  } catch (e: unknown) {
    return e;
  }
}

export const handleFetchErrors = async (
  fetchResult: Response | unknown,
  cookies: Cookies
): Promise<{ response: Response; data: unknown }> => {
  if (!(fetchResult instanceof Response)) {
    throw error(500, 'handleFetchErrors: noResponse');
  }

  const response = fetchResult;
  const data = await getJson(response);

  if (response.ok) {
    return {
      response,
      data
    };
  }

  const removeCookies = () => {
    cookies.set(tokens.accessToken, '', {
      path: '/',
      expires: new Date(0)
    });

    cookies.set(tokens.refreshToken, '', {
      path: '/',
      expires: new Date(0)
    });
  };

  const errorHandlers = {
    400: () => {
      console.log(`handleErrorStatus: 400 ${response.url}`);

      return {
        response,
        data
      };
    },
    401: () => {
      console.log(`handleErrorStatus: 401 ${response.url}`);
      removeCookies();
      throw redirect(302, typedRoute('/auth/sign-in'));
    },
    403: () => {
      console.log(`handleErrorStatus: 403 ${response.url}`);
      removeCookies();
      throw redirect(302, typedRoute('/auth/sign-in'));
    },
    404: () => {
      console.log(`handleErrorStatus: 404 ${response.url}`);
      throw error(404, {
        message: 'Not Found'
      });
    }
  };

  const handler = (errorHandlers as any)[response.status];
  if (handler) return handler();

  console.log(`handleErrorStatus: 500 ${response.url}`);

  throw error(500, {
    message: 'handleErrorStatus: Internal serwer error'
  });
};
