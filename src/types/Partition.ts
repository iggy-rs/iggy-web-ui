export type Partition = {
  id: number;
  segmentsCount: number;
  currentOffset: number;
  sizeBytes: number;
};
