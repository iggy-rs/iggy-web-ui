import { PUBLIC_API_KEY } from '$env/static/public';
import { streamDetailsMapper } from '$lib/domain/StreamDetails';
import { createAppQuery } from './createAppQuery';

export function getStreamDetailsQuery(id: number) {
  return createAppQuery({
    queryKey: ['streamDetails', id],
    queryFn: async () => {
      const res = await fetch(`${PUBLIC_API_KEY}/streams/${id}`);
      const data = await res.json();
      return streamDetailsMapper(data);
    }
  });
}
