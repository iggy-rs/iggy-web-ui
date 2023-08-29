import { PUBLIC_API_KEY } from '$env/static/public';
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Path = '/streams' | `/streams/${number}` | `/streams/${number}/topics/${number}` | '/stats';

type FetchResult =
  | {
      success: true;
      status: number;
      statusText: string;
      data: Record<string, unknown>;
    }
  | {
      success: false;
      status: number;
      statusText: string;
      error: Record<string, unknown>;
    };

type Query = {
  path: Path;
  throwError?: boolean;
};
type Mutation = Query & { body: unknown };

const fetchApi = async (payload: Mutation | Query, method: Method): Promise<FetchResult> => {
  const { path, throwError = false } = payload;

  const getJson = async (res: Response) => {
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      return json;
    } catch (err) {
      return null;
    }
  };

  try {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    const res = await fetch(`${PUBLIC_API_KEY}${path}`, {
      headers,
      method,
      ...('body' in payload ? { body: JSON.stringify(payload.body) } : {})
    });

    const json = await getJson(res);

    if (res.ok) {
      return {
        success: true,
        status: res.status,
        statusText: res.statusText,
        data: json || {}
      };
    }

    if (throwError) {
      throw Error(`${path}, method: ${method} threw error`, {
        cause: JSON.stringify({ status: res.status, statusText: res.statusText, json: json || {} })
      });
    }

    return {
      success: false,
      status: res.status,
      statusText: res.statusText,
      error: json || {}
    };
  } catch (e: unknown) {
    if (throwError)
      throw Error(`${path}, method: ${method} threw error`, { cause: JSON.stringify(e) });
    return { success: false, status: 500, statusText: JSON.stringify(e), error: {} };
  }
};

export const apiClient = {
  patch: (payload: Mutation) => fetchApi(payload, 'PATCH'),
  put: (payload: Mutation) => fetchApi(payload, 'PUT'),
  post: (payload: Mutation) => fetchApi(payload, 'POST'),
  get: (payload: Query) => fetchApi(payload, 'GET'),
  delete: (payload: Query) => fetchApi(payload, 'DELETE')
};
