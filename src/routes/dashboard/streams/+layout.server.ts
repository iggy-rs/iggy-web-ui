import { fetchApi, handleFetchErrors } from '$lib/api/fetchApi';
import { streamMapper, type Stream } from '$lib/domain/Stream';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const result = await fetchApi({
    method: 'GET',
    path: '/streams',
    cookies
  });

  const { data } = await handleFetchErrors(result, cookies);

  return {
    streams: (data as any).map(streamMapper) as Stream[]
  };
};
