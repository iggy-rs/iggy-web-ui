import type { Stream } from './Stream';
import type { Topic } from './Topic';

export type StreamDetails = Stream & { topics: Topic[] };
