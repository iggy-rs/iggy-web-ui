import { PUBLIC_API_KEY } from '$env/static/public';
import { streamMapper } from '$lib/domain/Stream';
import { createQuery, useQueryClient } from '@tanstack/svelte-query';

export function getStreamsQuery() {
  return createQuery({
    queryKey: ['streams'],
    queryFn: async () => {
      const res = await fetch(`${PUBLIC_API_KEY}/streams`);
      const data = await res.json();
      return data.map(streamMapper);
    }
  });
}
