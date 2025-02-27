<script lang="ts">
  import Breadcrumbs from './Breadcrumbs.svelte';
  import Icon, { type iconType } from './Icon.svelte';
  import PeriodicInvalidator from './PeriodicInvalidator.svelte';
  import { type Theme } from './ThemeController.svelte';
  import type { User } from '$lib/domain/User';
  import DropdownMenu from './DropdownMenu/DropdownMenu.svelte';
  import { theme } from './ThemeController.svelte';
  import { typedRoute } from '$lib/types/appRoutes';
  import Button from './Button.svelte';
  import StopPropagation from './StopPropagation.svelte';

  interface Props {
    user: User;
  }

  let { user }: Props = $props();

  let themeIcon = $derived(
    ({ dark: 'moon', light: 'sun', system: 'deviceDesktop' } as Record<Theme, iconType>)[$theme]
  );
</script>

<header
  class="h-[55px] min-h-[55px] z-20 max-h-[55px] fixed top-0 left-[90px] right-0 border-b px-4 flex items-center justify-between bg-shadeL200 dark:bg-shadeD900"
>
  <div class="flex gap-4">
    <PeriodicInvalidator />
    <Breadcrumbs />
  </div>

  <StopPropagation>
    <DropdownMenu placement="bottom-end" class="!p-0">
      {#snippet trigger()}
        <Button variant="rounded">
          <Icon
            name="userCircle"
            class="w-[32px] h-[32px] stroke-black dark:stroke-white"
            strokeWidth={1}
          />
        </Button>
      {/snippet}

      {#snippet children({ close })}
        <div class="p-1 min-w-[150px] transition-all duration-200 flex flex-col text-sm text-color">
          <span class="flex items-center justify-between gap-2 border-b px-2 py-3">
            <span>{user.username}</span>
            <Icon
              name="user"
              class="w-[24px] h-[24px] stroke-black dark:stroke-white"
              strokeWidth={1}
            />
          </span>
          <div class=" border-b flex items-center gap-5 px-2 py-3">
            <label for="theme">
              <span>Theme</span>
            </label>
            <label
              for="theme"
              class=" relative hover:cursor-pointer border hover:border-shadeD100 focus-within:ring-2 focus-within:ring-blue-600/40 rounded-md flex items-center gap-1"
            >
              <Icon
                name={themeIcon}
                class="w-[12px] absolute left-3 pointer-events-none top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <select
                name="theme"
                id="theme"
                bind:value={$theme}
                class="dark:bg-black text-color text-xs rounded-md outline-none hover:cursor-pointer pl-6 w-[90px] py-1 px-3"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
              <Icon
                name="selector"
                class="w-[14px] pointer-events-none absolute right-1 top-1/2 -translate-y-1/2"
              />
            </label>
          </div>
          <form class="w-full" method="POST" action={typedRoute('/auth/logout')}>
            <button
              class="flex w-full items-center justify-between gap-2 px-2 py-2 hover:bg-shadeL300 dark:hover:bg-shadeD1000 rounded-md my-1 dark:hover:text-white"
            >
              <span>Log Out</span>

              <Icon name="logout" />
            </button>
          </form>
        </div>
      {/snippet}
    </DropdownMenu>
  </StopPropagation>
</header>
