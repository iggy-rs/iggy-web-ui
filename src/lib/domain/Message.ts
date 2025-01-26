import { formatDateWithMicroseconds } from '$lib/utils/formatters/dateFormatter';

export type MessagePartition = {
  partitionId: number;
  currentOffset: number;
  messages: Message[];
};

export type Message = {
  checksum: number;
  headers: Record<string, HeaderField>;
  id: number;
  offset: number;
  payload: string;
  truncatedPayload: string;
  state: 'available';
  timestamp: number;
  formattedTimestamp: string;
};

export type HeaderField = {
  kind: string;
  value: string;
};

export function messageMapper(item: any): Message {
  const payload = item.payload;
  const truncatedPayload = payload.length > 30 ? `${payload.slice(0, 30)} [...]` : payload;
  const formattedTimestamp = formatDateWithMicroseconds(item.timestamp);

  return {
    id: item.id,
    headers: item.headers,
    offset: item.offset,
    state: item.state,
    timestamp: item.timestamp,
    formattedTimestamp,
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
