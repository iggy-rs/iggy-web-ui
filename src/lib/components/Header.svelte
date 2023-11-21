<script>
  import { goto } from '$app/navigation';
  import { typedRoute } from '$lib/types/appRoutes';

  import Breadcrumbs from './Breadcrumbs.svelte';
  import Button from './Button.svelte';
  import DropdownMenu from './DropdownMenu.svelte';
  import Icon from './Icon.svelte';
  import PeriodicInvalidator from './PeriodicInvalidator.svelte';
  import ThemeToggler from './ThemeToggler.svelte';
</script>

<header
  class="h-[55px] min-h-[55px] z-20 max-h-[55px] fixed top-0 left-[90px] right-0 border-b px-4 flex items-center justify-between bg-shadeL200 dark:bg-shadeD900"
>
  <div class="flex gap-4">
    <PeriodicInvalidator />
    <Breadcrumbs />
  </div>
  <ThemeToggler />

  <DropdownMenu
    placement="bottom-end"
    itemGroups={[
      [{ label: 'Spetz', icon: 'user', className: 'font-semibold ' }],
      [
        {
          label: 'Logout',
          action: async () => {
            // await fetch(typedRoute('/auth/logout'), { method: 'POST', body: new FormData() });
            // goto(typedRoute('/auth/sign-in'));
          },
          icon: 'logout'
        }
      ]
    ]}
  >
    <Icon name="userCircle" class="w-[32px] h-[32px] stroke-white" strokeWidth={1} />
  </DropdownMenu>
</header>
