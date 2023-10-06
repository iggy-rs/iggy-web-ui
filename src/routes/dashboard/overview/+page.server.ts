import { fetchApi } from '$lib/api/fetchApi';
import { statsMapper } from '$lib/domain/Stats';

export const load = async () => {
  const statsPromise = async () => {
    const result = await fetchApi({
      method: 'GET',
      path: `/stats`
    });

    const stats = statsMapper((result as any).data);

    return stats;
  };

  return {
    streamed: {
      stats: statsPromise()
    }
  };
};
