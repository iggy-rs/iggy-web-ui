export type Topic = {
  id: number;
  name: string;
  partitionsCount: number;
};

export function topicMapper(item: any): Topic {
  return {
    id: item.id,
    name: item.name,
    partitionsCount: item.partitions_count
  };
}
