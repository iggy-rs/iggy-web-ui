export type Stream = {
  id: number;
  name: string;
  sizeBytes: number;
  messagesCount: number;
  topicsCount: number;
  createdAt: number;
};

export function streamMapper(item: any): Stream {
  return {
    id: item.id,
    name: item.name,
    sizeBytes: item.size_bytes,
    messagesCount: item.messages_count,
    topicsCount: item.topics_count,
    createdAt: item.created_at
  };
}

export function streamListMapper(data: any): Stream[] {
  const streams = data.map(streamMapper) as Stream[];
  const sortedStream = streams.sort((a, b) => b.createdAt - a.createdAt);

  return sortedStream;
}
