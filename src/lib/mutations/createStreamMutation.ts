import { PUBLIC_API_KEY } from '$env/static/public';
import { createMutation } from '@tanstack/svelte-query';

type CreateStreamMutationPayload = {
  id: number;
  name: string;
};

export function createStreamMutation() {
  return createMutation({
    mutationFn: async (payload: CreateStreamMutationPayload) => {
      const res = await fetch(`${PUBLIC_API_KEY}/streams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          stream_id: payload.id,
          name: payload.name
        })
      });
      const data = await res.json();
      return data;
    }
  });
}
