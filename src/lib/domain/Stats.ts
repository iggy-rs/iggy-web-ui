type StatsStringItem = { name: string; value: string };
type StatsNumberItem = { name: string; value: number };

export type Stats = {
  processId: StatsNumberItem;
  cpuUsage: StatsNumberItem;
  memoryUsage: StatsNumberItem;
  totalMemory: StatsNumberItem;
  availableMemory: StatsNumberItem;
  runTime: StatsNumberItem;
  startTime: StatsNumberItem;
  readBytes: StatsNumberItem;
  writtenBytes: StatsNumberItem;
  messagesSizeBytes: StatsNumberItem;
  streamsCount: StatsNumberItem;
  topicsCount: StatsNumberItem;
  partitionsCount: StatsNumberItem;
  segmentsCount: StatsNumberItem;
  messagesCount: StatsNumberItem;
  clientsCount: StatsNumberItem;
  consumerGroupsCount: StatsNumberItem;
  hostName: StatsStringItem;
  osName: StatsStringItem;
  osVersion: StatsStringItem;
  kernelVersion: StatsStringItem;
};

export function statsMapper(apiStats: any): Stats {
  return {
    processId: {
      name: 'Process ID',
      value: apiStats.process_id
    },
    cpuUsage: {
      name: 'CPU usage',
      value: apiStats.cpu_usage
    },
    memoryUsage: {
      value: apiStats.memory_usage,
      name: 'Memory usage'
    },
    totalMemory: {
      name: 'Total memory',
      value: apiStats.total_memory
    },
    availableMemory: {
      name: 'Available memory',
      value: apiStats.available_memory
    },
    runTime: {
      name: 'Run time',
      value: apiStats.run_time
    },

    startTime: {
      name: 'Start time',
      value: apiStats.start_time
    },

    readBytes: {
      name: 'Read bytes',
      value: apiStats.read_bytes
    },

    writtenBytes: {
      name: 'Written Bytes',
      value: apiStats.written_bytes
    },
    messagesSizeBytes: {
      name: 'Messages Size',
      value: apiStats.messages_size_bytes
    },
    streamsCount: {
      name: 'Streams',
      value: apiStats.streams_count
    },

    topicsCount: {
      name: 'Topics',
      value: apiStats.topics_count
    },

    partitionsCount: {
      name: 'Partitions',
      value: apiStats.partitions_count
    },

    segmentsCount: {
      name: 'Segments',
      value: apiStats.segments_count
    },

    messagesCount: {
      name: 'Messages',
      value: apiStats.messages_count
    },

    clientsCount: {
      name: 'Clients',
      value: apiStats.clients_count
    },
    consumerGroupsCount: {
      name: 'Consumer Groups',
      value: apiStats.consumer_groups_count
    },

    hostName: {
      name: 'Host',
      value: apiStats.host_name
    },
    osName: {
      name: 'System',
      value: apiStats.os_name
    },

    osVersion: {
      name: 'System version',
      value: apiStats.os_version
    },
    kernelVersion: {
      name: 'Kernvel version',
      value: apiStats.kernel_version
    }
  };
}
