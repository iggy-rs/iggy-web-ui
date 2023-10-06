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
</script>

<div id="popupsRoot" />
<AppModals />
<AppToasts />

<div class="flex w-full max-h-screen">
  <Navbar />
  <div class="flex-1 flex flex-col">
    <header
      class="h-[55px] min-h-[55px] max-h-[55px] border-b px-4 flex items-center justify-between bg-shadeL200 dark:bg-shadeD900"
    >
      <RefetchIntervalToggler />

      <DropdownMenu
        placement="bottom-end"
        itemGroups={[
          [{ label: 'Spetz', icon: 'user', className: 'font-semibold' }],
          [
            {
              label: 'Logout',
              action: async () => {
                await fetch(typedRoute('/auth/logout'), { method: 'POST', body: new FormData() });
                goto(typedRoute('/auth/login'));
              },
              icon: 'logout'
            }
          ]
        ]}
      >
        <Button variant="rounded" class="p-5">
          <Icon name="userCircle" className="w-[32px] h-[32px]" strokeWidth={1} />
        </Button>
      </DropdownMenu>
    </header>
    <main
      class="h-[calc(100vh-55px)] max-h-[calc(100vh-55px)] overflow-hidden bg-shadeL100 dark:bg-shadeD700"
    >
      <slot />
    </main>
  </div>
</div>
