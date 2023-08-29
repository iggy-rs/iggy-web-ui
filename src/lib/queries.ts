import { statsMapper } from '$lib/domain/Stats';
import { streamDetailsMapper } from '$lib/domain/StreamDetails';
import { apiClient } from '$lib/utils/apiClient';
import { createQuery } from '@tanstack/svelte-query';
import { streamMapper, type Stream } from './domain/Stream';
import { topicDetailsMapper } from './domain/TopicDetails';

export function getStatsQuery() {
  return createQuery({
    queryKey: ['stats'],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: async () => {
      const result = await apiClient.get({ path: '/stats', throwError: true });

      return statsMapper((result as any).data);
    }
  });
}

export function getStreamDetailsQuery(id: number) {
  return createQuery({
    queryKey: ['streamDetails', id],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: async () => {
      const result = await apiClient.get({ path: `/streams/${id}`, throwError: true });
      return streamDetailsMapper((result as any).data);
    }
  });
}

export function getStreamsQuery() {
  return createQuery({
    queryKey: ['streams'],
    queryFn: async () => {
      const res = await apiClient.get({ path: '/streams', throwError: true });
      return (res as any).data.map(streamMapper) as Stream[];
    }
  });
}

export function getTopicDetailsQuery(streamId: number, topicId: number) {
  return createQuery({
    queryKey: ['topicDetails', streamId, topicId],
    queryFn: async () => {
      const result = await apiClient.get({
        path: `/streams/${streamId}/topics/${topicId}`,
        throwError: true
      });

      return topicDetailsMapper((result as any).data);
    }
  });
}
