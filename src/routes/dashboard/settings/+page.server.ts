import { fetchApi } from '$lib/api/fetchApi';
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

  return {
    streamed: {
      users: usersPromise()
    }
  };
};
