import { fetchIggyBackendApi } from '$lib/api/fetchApi';
import { handleFetchErrors } from '$lib/api/handleFetchErrors';
import { statsMapper } from '$lib/domain/Stats';

export const load = async ({ cookies }) => {
  const getStats = async () => {
    const result = await fetchIggyBackendApi({
      method: 'GET',
      path: '/stats',
      cookies
    });

    const { data } = await handleFetchErrors(result, cookies);
    return statsMapper(data);
  };

  return {
    serverStats: await getStats()
  };
};
