import { fetchApi, handleFetchErrors } from '$lib/api/fetchApi';
import { statsMapper } from '$lib/domain/Stats';
import { userMapper, type User } from '$lib/domain/User.js';

export const load = async ({ cookies }) => {
  const getUsers = async () => {
    const result = await fetchApi({
      method: 'GET',
      path: '/users',
      cookies
    });

    const { data } = await handleFetchErrors(result, cookies);
    return (data as any).map((item: any) => userMapper(item)) as User[];
  };

  const getStats = async () => {
    const result = await fetchApi({
      method: 'GET',
      path: '/stats',
      cookies
    });

    const { data } = await handleFetchErrors(result, cookies);
    return statsMapper(data);
  };

  const [users, serverStats] = await Promise.all([getUsers(), getStats()]);

  return {
    users,
    serverStats
  };
};
