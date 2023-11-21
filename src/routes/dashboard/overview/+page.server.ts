import { fetchApi } from '$lib/api/fetchApi';
import { handleFetchErrors } from '$lib/api/handleFetchErrors';
import { statsMapper } from '$lib/domain/Stats';

export const load = async ({ cookies }) => {
  const result = await fetchApi({
    path: '/stats',
    method: 'GET',
    cookies
  });

  const { data } = await handleFetchErrors(result, cookies);

  return {
    stats: statsMapper(data)
  };
};
