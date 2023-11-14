<script>
  import AppModals from '$lib/components/Modals/AppModals.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  import RefetchIntervalToggler, {
    dataRefetchIntervalS
  } from '$lib/components/RefetchIntervalToggler.svelte';
  import ThemeToggler from '$lib/components/ThemeToggler.svelte';
  import AppToasts from '$lib/components/AppToasts.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Button from '$lib/components/Button.svelte';
  import DropdownMenu from '$lib/components/DropdownMenu.svelte';
  import { typedRoute } from '$lib/types/appRoutes';
  import { goto } from '$app/navigation';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import Header from '$lib/components/Header.svelte';

  export let data;
</script>

<div id="popupsRoot" />
<AppModals />
<AppToasts />

<Navbar />
<Header />
<main
  class="fixed left-[90px] top-[55px] bottom-0 right-0 bg-shadeL100 dark:bg-shadeD700 flex flex-col"
>
  <slot />
</main>
