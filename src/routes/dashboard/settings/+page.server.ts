import { fetchApi } from '$lib/api/fetchApi';
import { statsMapper } from '$lib/domain/Stats';
import { userMapper, type User } from '$lib/domain/User.js';

export const load = async () => {
  const usersPromise = async () => {
    const result = await fetchApi({
      method: 'GET',
      path: '/users'
    });

    const users = (result.data as any).map((item: any) => userMapper(item));
    return users as User[];
  };

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
      users: usersPromise(),
      serverStats: statsPromise()
    }
  };
};
