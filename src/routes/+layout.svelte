<script>
  import { browser } from '$app/environment';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import AppModals from '$lib/components/Modals/AppModals.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import '../styles/app.css';
  import RefetchIntervalToggler from '$lib/components/RefetchIntervalToggler.svelte';
  import Icon from '$lib/components/Icon.svelte';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser
      }
    }
  });
</script>

<QueryClientProvider client={queryClient}>
  <AppModals />

  <div class="flex w-full max-h-screen">
    <Navbar />
    <div class="flex-1 flex flex-col">
      <header class="h-[55px] min-h-[55px] max-h-[55px] border-b">
        <RefetchIntervalToggler />
      </header>
      <main class="h-[calc(100vh-55px)]">
        <slot />
      </main>
    </div>
  </div>
</QueryClientProvider>
