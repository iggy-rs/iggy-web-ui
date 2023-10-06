import type { KeysToSnakeCase } from '$lib/utils/utilTypes';

export type GlobalPermissions = {
  manageServers: boolean;
  readServers: boolean;
  manageUsers: boolean;
  readUsers: boolean;
  manageStreams: boolean;
  readStreams: boolean;
  manageTopics: boolean;
  readTopics: boolean;
  pollMessages: boolean;
  sendMessages: boolean;
};

export type StreamPermissions = {
  manageStream: boolean;
  readStream: boolean;
  manageTopics: boolean;
  readTopics: boolean;
  pollMessages: boolean;
  sendMessages: boolean;
  topics: Record<number, TopicPermissions>;
};

export type TopicPermissions = {
  manageTopic: boolean;
  readTopic: boolean;
  pollMessages: boolean;
  sendMessages: boolean;
};
