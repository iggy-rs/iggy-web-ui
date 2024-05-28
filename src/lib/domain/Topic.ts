import { bytesFormatter } from '$lib/utils/formatters/bytesFormatter';
import { formatDate } from '$lib/utils/formatters/dateFormatter';

export type Topic = {
  id: number;
  name: string;
  sizeBytes: string;
  sizeFormatted: string;
  messagesCount: number;
  messageExpiry: number;
  partitionsCount: number;
  createdAt: string;
};

export function topicMapper(item: any): Topic {
  return {
    id: item.id,
    name: item.name,
    sizeBytes: item.size,
    sizeFormatted: bytesFormatter(item.size),
    messageExpiry: item.message_expiry ?? 0,
    messagesCount: item.messages_count,
    partitionsCount: item.partitions_count,
    createdAt: formatDate(item.created_at)
  };
}
