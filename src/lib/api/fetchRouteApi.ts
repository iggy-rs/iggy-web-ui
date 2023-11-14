import type { ApiSchema } from './ApiSchema';

const getJson = async (res: Response): Promise<unknown | null> => {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    return json as unknown;
  } catch (err) {
    return null;
  }
};

export const fetchRouteApi = async (arg: ApiSchema) => {
  try {
    const res = await fetch('/api/proxy', { body: JSON.stringify(arg), method: 'POST' });

    const data = await getJson(res);
    return data;
  } catch (err) {
    throw new Error('something went wrong');
  }
};
