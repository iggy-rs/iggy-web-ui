import { fetchApi } from '$lib/api/fetchApi.js';
import { streamDetailsMapper } from '$lib/domain/StreamDetails';

export const load = async ({ params }) => {
  const streamDetailsPromise = async () => {
    const result = await fetchApi({
      method: 'GET',
      path: `/streams/${+params.streamId}`,
      throwOnError: true
    });

    return streamDetailsMapper((result as any).data);
  };

  return {
    streamed: {
      streamDetails: streamDetailsPromise()
    }
  };
};
