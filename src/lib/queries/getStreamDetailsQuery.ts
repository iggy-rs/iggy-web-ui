import { PUBLIC_API_KEY } from '$env/static/public';
import { streamDetailsMapper } from '$lib/domain/StreamDetails';
import { createQuery } from '@tanstack/svelte-query';

export function getStreamDetailsQuery(id: number) {
  return createQuery({
    queryKey: ['streamDetails', id],
    queryFn: async () => {
      const res = await fetch(`${PUBLIC_API_KEY}/streams/${id}`);
      const data = await res.json();
      return streamDetailsMapper(data);
    }
  });
}
