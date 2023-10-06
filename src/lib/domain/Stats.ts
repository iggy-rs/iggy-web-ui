import { bytesFormatter } from '$lib/utils/bytesFormatter';
import { intervalToDuration, formatDuration } from 'date-fns';

type StatsStringItem = { name: string; value: string };
type StatsNumberItem = { name: string; value: number };

export type Stats = {
  processId: StatsNumberItem;
  cpuUsage: StatsStringItem;
  memoryUsage: StatsStringItem;
  totalMemory: StatsStringItem;
  availableMemory: StatsStringItem;
  runTime: StatsStringItem;
  startTime: StatsNumberItem;
  readBytes: StatsStringItem;
  writtenBytes: StatsStringItem;
  messagesSizeBytes: StatsStringItem;
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

export function statsMapper(item: any): Stats {
  const formattedRuntime = formatDuration(
    intervalToDuration({ start: 0, end: item.run_time * 1000 }),
    {
      format: ['hours', 'minutes', 'seconds'],
      zero: true,
      delimiter: ':',
      locale: {
        formatDistance: (_token, count) => String(count).padStart(2, '0')
      }
    }
  );

  return {
    processId: {
      name: 'Process ID',
      value: item.process_id
    },
    cpuUsage: {
      name: 'CPU usage',
      value: `${item.cpu_usage.toFixed(2)} %`
    },
    memoryUsage: {
      value: bytesFormatter(item.memory_usage),
      name: 'Memory usage'
    },
    totalMemory: {
      name: 'Total memory',
      value: bytesFormatter(item.total_memory)
    },
    availableMemory: {
      name: 'Available memory',
      value: bytesFormatter(item.available_memory)
    },
    runTime: {
      name: 'Run time',
      value: formattedRuntime
    },
    startTime: {
      name: 'Start time',
      value: item.start_time
    },

    readBytes: {
      name: 'Read',
      value: bytesFormatter(item.read_bytes)
    },

    writtenBytes: {
      name: 'Written',
      value: bytesFormatter(item.written_bytes)
    },
    messagesSizeBytes: {
      name: 'Messages Size',
      value: bytesFormatter(item.messages_size_bytes)
    },
    streamsCount: {
      name: 'Streams',
      value: item.streams_count
    },

    topicsCount: {
      name: 'Topics',
      value: item.topics_count
    },

    partitionsCount: {
      name: 'Partitions',
      value: item.partitions_count
    },

    segmentsCount: {
      name: 'Segments',
      value: item.segments_count
    },

    messagesCount: {
      name: 'Messages',
      value: item.messages_count
    },

    clientsCount: {
      name: 'Clients',
      value: item.clients_count
    },
    consumerGroupsCount: {
      name: 'Consumer Groups',
      value: item.consumer_groups_count
    },

    hostName: {
      name: 'Host',
      value: item.hostname
    },
    osName: {
      name: 'System',
      value: item.os_name
    },

    osVersion: {
      name: 'System version',
      value: item.os_version
    },
    kernelVersion: {
      name: 'Kernel version',
      value: item.kernel_version
    }
  };
}
