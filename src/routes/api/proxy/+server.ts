import { fetchApi } from '$lib/api/fetchApi';
import { handleFetchErrors } from '$lib/api/handleFetchErrors';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { path, body, method } = await request.json();

  if (!path || !body || !method) {
    const message = `routes/api/proxy/+server.ts no path or body or method provided`;
    console.error(message);
    throw error(500, {
      message
    });
  }

  const result = await fetchApi({ body, path, method, cookies });

  console.log('fetchApi', result);
  const { data, response } = await handleFetchErrors(result, cookies);

  return json({ data, ok: response.ok, status: response.status });
};
