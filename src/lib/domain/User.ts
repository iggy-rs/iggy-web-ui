import { formatDate } from '$lib/utils/dateFormatter';

export type User = {
  id: number;
  createdAt: string;
  status: 'active' | 'inactive';
  username: string;
};

export function userMapper(item: any): User {
  console.log('userMapper', item);
  return {
    id: item.id,
    createdAt: formatDate(item.created_at),
    status: item.status,
    username: `${item.username} ${item.id === 1 ? '(root)' : ''}`
  };
}
