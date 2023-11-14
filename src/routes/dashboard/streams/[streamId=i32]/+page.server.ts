import { fetchApi, handleFetchErrors } from '$lib/api/fetchApi.js';
import { streamDetailsMapper } from '$lib/domain/StreamDetails';

export const load = async ({ params, cookies }) => {
  const getStreamDetails = async () => {
    const result = await fetchApi({
      method: 'GET',
      path: `/streams/${+params.streamId}`,
      cookies
    });

    const { data } = await handleFetchErrors(result, cookies);

    return streamDetailsMapper(data);
  };

  const streamDetails = await getStreamDetails();

  console.log('getStream details', params.streamId, streamDetails.topics.length);

  // await new Promise((res, rej) => {
  //   setTimeout(() => {
  //     res(0);
  //   }, 1000);
  // });

  return {
    streamDetails
  };
};
