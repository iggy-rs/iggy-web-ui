import { API_URL } from '$env/static/private';
import type { ApiSchema } from '$lib/api/ApiSchema';
import { tokens } from '$lib/utils/tokens';
import { type Cookies } from '@sveltejs/kit';

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
