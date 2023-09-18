import { fetchApi } from '$lib/api/fetchApi';
import { topicDetailsMapper } from '$lib/domain/TopicDetails';

export const load = async ({ params }) => {
  const topicPromise = async () => {
    const result = await fetchApi({
      method: 'GET',
      path: `/streams/${+params.streamId}/topics/${+params.topicId}`
    });

    return topicDetailsMapper((result as any).data);
  };

  return {
    streamed: {
      topic: topicPromise()
    }
  };
};
