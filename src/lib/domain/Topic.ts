import { numberSizes } from '$lib/utils/constants/numberSizes';
import { bytesFormatter } from '$lib/utils/formatters/bytesFormatter';
import { formatDate } from '$lib/utils/formatters/dateFormatter';
import { durationFormatter } from '$lib/utils/formatters/durationFormatter';

export type Topic = {
  id: number;
  name: string;
  sizeBytes: string;
  sizeFormatted: string;
  messagesCount: number;
  messageExpiry: number;
  messageExpiryFormatted: string;
  partitionsCount: number;
  createdAt: string;
  compressionAlgorithm: number;
  maxTopicSize: number;
};

export function topicMapper(item: any): Topic {
  const messageExpirySeconds = item.message_expiry == null || item.message_expiry >= numberSizes.max.u32 ? 0 : item.message_expiry;
  return {
    id: item.id,
    name: item.name,
    sizeBytes: item.size,
    sizeFormatted: bytesFormatter(item.size),
    messageExpiry: messageExpirySeconds,
    messageExpiryFormatted: formatExpiry(messageExpirySeconds),
    messagesCount: item.messages_count,
    partitionsCount: item.partitions_count,
    createdAt: formatDate(item.created_at),
    compressionAlgorithm: item.compression_algorithm ?? 0,
    maxTopicSize: item.max_topic_size,
  };
}

function formatExpiry(expiry: number): string {
  if (expiry === 0 || expiry >= numberSizes.max.u32) {
    return 'never';
  }

  return durationFormatter(expiry);
}
