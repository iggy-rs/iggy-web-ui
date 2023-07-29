export type Stream = {
  id: number;
  name: string;
  sizeBytes: number;
  messagesCount: number;
  topicsCount: number;
};

export function streamMapper(item: any): Stream {
  return {
    id: item.id,
    name: item.name,
    sizeBytes: item.size_bytes,
    messagesCount: item.messages_count,
    topicsCount: item.topics_count
  };
}
