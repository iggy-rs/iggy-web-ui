import { formatDate } from '$lib/utils/formatters/dateFormatter';

export type Topic = {
  id: number;
  name: string;
  sizeBytes: number;
  messagesCount: number;
  partitionsCount: number;
  createdAt: string;
};

export function topicMapper(item: any): Topic {
  return {
    id: item.id,
    name: item.name,
    sizeBytes: item.size_bytes,
    messagesCount: item.messages_count,
    partitionsCount: item.partitions_count,
    createdAt: formatDate(item.created_at)
  };
}
