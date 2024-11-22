import { fetchApi } from '$lib/api/fetchApi';
import { handleFetchErrors } from '$lib/api/handleFetchErrors';
import { messageDetailsMapper } from '../../../../../../../lib/domain/MessageDetails';
import { topicDetailsMapper } from '../../../../../../../lib/domain/TopicDetails';

export const load = async ({ params, cookies }) => {
  const getMessages = async () => {
    const result = await fetchApi({
      method: 'GET',
      path: `/streams/${+params.streamId}/topics/${+params.topicId}/messages`,
      cookies,
      queryParams: {
        count: "1000",
      }
    });

    const { data } = await handleFetchErrors(result, cookies);

    return messageDetailsMapper(data as any);
  };

  const getTopic = async () => {
    const result = await fetchApi({
      method: 'GET',
      path: `/streams/${+params.streamId}/topics/${+params.topicId}`,
      cookies
    });

    const { data } = await handleFetchErrors(result, cookies);

    return topicDetailsMapper(data);
  };

  return {
    messages: await getMessages(),
    topic: await getTopic(),
  };
};
