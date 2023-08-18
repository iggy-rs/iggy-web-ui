import { PUBLIC_API_KEY } from '$env/static/public';
import { topicDetailsMapper } from '$lib/domain/TopicDetails';
import { createQuery } from '@tanstack/svelte-query';

export function getTopicDetailsQuery(streamId: number, topicId: number) {
  return createQuery({
    queryKey: ['topicDetails', streamId, topicId],
    queryFn: async () => {
      const res = await fetch(`${PUBLIC_API_KEY}/streams/${streamId}/topics/${topicId}`);
      const data = await res.json();
      return topicDetailsMapper(data);
    }
  });
}
