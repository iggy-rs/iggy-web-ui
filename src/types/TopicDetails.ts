import type { Partition } from './Partition';
import type { Topic } from './Topic';

export type TopicDetails = Topic & { partitions: Partition[] };
