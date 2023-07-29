import { PUBLIC_API_KEY } from '$env/static/public';
import { streamMapper } from '$lib/domain/Stream';
import { createAppQuery } from './createAppQuery';

export function getStreamsQuery() {
  return createAppQuery({
    queryKey: ['streams'],
    queryFn: async () => {
      const res = await fetch(`${PUBLIC_API_KEY}/streams`);
      const data = await res.json();
      return data.map(streamMapper);
    }
  });
}
