import { fetchApi } from '$lib/api/fetchApi';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { path, body, method } = await request.json();

  console.log('proxy post', path, body, method);

  if (!path || !body || !method) {
    const message = `routes/api/proxy/+server.ts no path or body or method provided`;
    console.error(message);
    throw error(500, {
      message
    });
  }

  const res = await fetchApi({ body, path, method, cookies });

  console.log('fetchApi proxy');
  console.dir(res, { depth: 12 });
  // const data = handleFetchApiErrors(res, cookies);

  // console.log('api/proxy data', data);

  return json(2);
};
