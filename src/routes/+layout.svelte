<script>
  import { browser } from '$app/environment';
  import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/svelte-query';
  import AppModals from '$lib/components/Modals/AppModals.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import '../styles/app.css';
  import RefetchIntervalToggler, {
    dataRefetchIntervalS
  } from '$lib/components/RefetchIntervalToggler.svelte';
  import ThemeToggler from '$lib/components/ThemeToggler.svelte';
  import AppToasts from '$lib/components/AppToasts.svelte';

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {},
      queries: {
        enabled: browser
        // refetchInterval: $dataRefetchIntervalS * 1000
      }
    }
  });

  // $: {
  //   queryClient.setDefaultOptions({
  //     queries: {
  //       ...queryClient.getDefaultOptions().queries,
  //       refetchInterval: $dataRefetchIntervalS * 1000
  //     }
  //   });
  // }
</script>

<QueryClientProvider client={queryClient}>
  <AppModals />
  <AppToasts />

  <div class="flex w-full max-h-screen">
    <Navbar />
    <div class="flex-1 flex flex-col">
      <header
        class="h-[55px] min-h-[55px] max-h-[55px] border-b px-4 flex items-center justify-between bg-shadeL200 dark:bg-shadeD900"
      >
        <RefetchIntervalToggler />

        <ThemeToggler />
      </header>
      <main class="h-[calc(100vh-55px)] bg-shadeL100 dark:bg-shadeD700">
        <slot />
      </main>
    </div>
  </div>
</QueryClientProvider>
