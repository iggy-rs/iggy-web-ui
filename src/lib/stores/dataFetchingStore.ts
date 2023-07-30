import { writable } from 'svelte/store';

export const dataRefetchIntervalS = writable(10);
export const isAnyQueryLoading = writable(false);
