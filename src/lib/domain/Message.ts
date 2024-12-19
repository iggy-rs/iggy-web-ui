import { formatDateWithMicroseconds } from '$lib/utils/formatters/dateFormatter';

export type MessagePartition = {
  partitionId: number;
  currentOffset: number;
  messages: Message[];
};

export type Message = {
  checksum: number;
  headers: Record<string, string>;
  id: number;
  offset: number;
  payload: string;
  truncatedPayload: string;
  state: 'available';
  timestamp: number;
  formattedTimestamp: string;
};

export function messageMapper(item: any): Message {
  let payload = '';

  try {
    payload = atob(item.payload);
  } catch {
    payload = '[NOT DECODABLE]';
  }

  let truncatedPayload = payload;
  if (payload.length > 100) {
    truncatedPayload = `${payload.slice(0, 100)} [...]`;
  }

  return {
    id: item.id,
    headers: item.headers,
    offset: item.offset,
    state: item.state,
    timestamp: item.timestamp,
    formattedTimestamp: formatDateWithMicroseconds(item.timestamp),
    checksum: item.checksum,
    payload,
    truncatedPayload
  };
}

export function messagePartitionMapper(item: any): MessagePartition {
  return {
    partitionId: item.partition_id,
    currentOffset: item.current_offset,
    messages: item.messages.map(messageMapper)
  };
}
