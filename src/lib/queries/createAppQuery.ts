import {
  dataRefetchIntervalS,
  isAnyQueryLoading
} from '$lib/components/RefetchIntervalToggler.svelte';
import { createQuery } from '@tanstack/svelte-query';
import { derived } from 'svelte/store';

type CreateAppQueryOptions = {
  queryKey: unknown[];
  queryFn: () => Promise<any>;
};

export function createAppQuery(options: CreateAppQueryOptions) {
  const query = createQuery(
    derived(dataRefetchIntervalS, ($dataRefetchIntervalS) => ({
      queryKey: options.queryKey,
      refetchInterval: $dataRefetchIntervalS * 1000,
      queryFn: options.queryFn
    }))
  );

  return derived(query, ($query) => {
    isAnyQueryLoading.update(() => $query.isRefetching);
    return $query;
  });
}
