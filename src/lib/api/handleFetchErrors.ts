import { error, type Cookies, redirect } from '@sveltejs/kit';
import { getJson } from './getJson';
import { tokens } from '$lib/utils/tokens';
import { typedRoute } from '$lib/types/appRoutes';

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
