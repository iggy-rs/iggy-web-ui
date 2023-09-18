import { fetchApi } from '$lib/api/fetchApi';
import { streamMapper, type Stream } from '$lib/domain/Stream';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  const streamsPromise = async () => {
    const result = await fetchApi({
      method: 'GET',
      path: `/streams`,
      throwOnError: true
    });

    return (result.data as any).map(streamMapper) as Stream[];
  };
  return {
    streamed: {
      streams: streamsPromise()
    }
  };
};
