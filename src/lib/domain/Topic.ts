import { bytesFormatter } from '$lib/utils/formatters/bytesFormatter';
import { formatDate } from '$lib/utils/formatters/dateFormatter';

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
  const messageExpiry = item.message_expiry ?? 0;
  return {
    id: item.id,
    name: item.name,
    sizeBytes: item.size,
    sizeFormatted: bytesFormatter(item.size),
    messageExpiry: messageExpiry,
    messageExpiryFormatted: format_expiry(messageExpiry),
    messagesCount: item.messages_count,
    partitionsCount: item.partitions_count,
    createdAt: formatDate(item.created_at),
    compressionAlgorithm: item.compression_algorithm ?? 0,
    maxTopicSize: item.max_topic_size,
  };
}

function format_expiry(expiry: number): string {
  if (expiry === 0 || expiry >= 18446744073709551615n) {
    return 'never';
  }

  const ms = expiry / 1000;
  const seconds = ms / 1000;
  const minutes = (ms / (1000 * 60));
  const hours = (ms / (1000 * 60 * 60));
  const days = (ms / (1000 * 60 * 60 * 24));
  if (seconds < 60) {
    return seconds + " second(s)";
  }
  else if (minutes < 60) { 
    return minutes.toFixed(1) + " minute(s)";
  }
  else if (hours < 24) {
    return hours.toFixed(1) + " hour(s)";
  }
  else {
    return days.toFixed(1) + " day(s)"
  }
}