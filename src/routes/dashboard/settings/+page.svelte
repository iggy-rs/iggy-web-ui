<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import { page } from '$app/stores';
  import { oneOfOrDefault } from '$lib/utils/queryParsers';
  import { goto } from '$app/navigation';
  import type { iconType } from '$lib/components/Icon.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import UsersTab from '$lib/components/RouteComponents/Settings/UsersTab.svelte';
  import type { ComponentProps, ComponentType } from 'svelte';
  import { noTypeCheck } from '$lib/utils/noTypeCheck.js';
  import TerminalTab from '$lib/components/RouteComponents/Settings/TerminalTab.svelte';
  import ServerTab from '$lib/components/RouteComponents/Settings/ServerTab.svelte';
  import UsersTabActions from '$lib/components/RouteComponents/Settings/UsersTabActions.svelte';

  export let data;

  const createTabItem = <T extends ComponentType>(item: {
    component: T;
    label: string;
    icon: iconType;
    props: ComponentProps<InstanceType<T>>;
    tabActions?: ComponentType;
  }) => item;

  const tabs = {
    server: createTabItem({
      component: ServerTab,
      icon: 'adjustments',
      label: 'Server',
      props: {
        serverStats: data.serverStats
      }
    }),
    users: createTabItem({
      component: UsersTab,
      icon: 'usersGroup',
      label: 'Users',
      props: { users: data.users },
      tabActions: UsersTabActions
    }),
    terminal: createTabItem({
      component: TerminalTab,
      icon: 'terminal',
      label: 'Terminal',
      props: {}
    })
  };

  $: activeTab = oneOfOrDefault($page.url.searchParams.get('tab'), Object.keys(tabs), 'users');
</script>

<div class="flex justify-between items-center px-10">
  <h1 class="font-semibold text-3xl text-color my-10">Settings</h1>

  <div>
    <svelte:component this={tabs[activeTab].tabActions} />
  </div>
</div>

<div class="flex gap-12 border-b px-10">
  {#each Object.entries(tabs) as [tabName, { icon, label }], idx (idx)}
    {@const isActive = activeTab === tabName}
    <button
      class={twMerge('pb-3 relative group flex items-center  justify-start gap-2 text-color')}
      on:click={() => {
        const url = new URL($page.url);
        url.searchParams.set('tab', tabName);
        goto(url.toString());
      }}
    >
      <Icon name={icon} class="w-[15px] h-[15px]" />

      <span>
        {label}
      </span>

      <div
        class={twMerge(
          'absolute left-0 right-0 top-full h-[2px] -translate-y-full rounded-tl-md rounded-tr-md transition-colors duration-200',
          isActive
            ? 'dark:bg-white bg-black'
            : 'group-hover:bg-shadeL600 dark:group-hover:bg-shadeD300'
        )}
      />
    </button>
  {/each}
</div>

<svelte:component this={noTypeCheck(tabs[activeTab].component)} {...tabs[activeTab].props} />
