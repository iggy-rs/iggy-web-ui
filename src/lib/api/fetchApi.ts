import { PUBLIC_API_KEY } from '$env/static/public';
import type { ApiSchema } from '$lib/api/ApiSchema';
import { error } from '@sveltejs/kit';

type FetchResult =
  | {
      success: true;
      response: Response;
      data: unknown;
    }
  | {
      success: false;
      response: Response;
    }
  | {
      error: unknown;
    };

const getJson = async (res: Response): Promise<unknown | null> => {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    return json as unknown;
  } catch (err) {
    return null;
  }
};

export async function fetchApi(
  payload: ApiSchema & { throwOnError?: true }
): Promise<{ success: true; response: Response; data: unknown }>;

export async function fetchApi(payload: ApiSchema & { throwOnError?: false }): Promise<FetchResult>;

export async function fetchApi(args: ApiSchema & { throwOnError?: boolean }) {
  const { path, method, throwOnError = false } = args;

  try {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    const res = await fetch(`${PUBLIC_API_KEY}${path}`, {
      headers,
      method,
      ...('body' in args ? { body: JSON.stringify(args.body) } : {})
    });

    const json = await getJson(res);

    if (res.status === 401) {
      await fetch('/auth/logout');
    }

    if (res.ok) {
      return {
        success: true,
        response: res,
        data: json
      };
    }

    if (throwOnError) {
      throw error(res.status, JSON.stringify(res));
    }

    return {
      success: false,
      response: res
    };
  } catch (e: unknown) {
    if (throwOnError)
      throw Error(`${path}, method: ${method} threw error`, { cause: JSON.stringify(e) });

    return { error: e };
  }
}
