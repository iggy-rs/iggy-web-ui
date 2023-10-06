<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import { page } from '$app/stores';
  import { oneOfOrDefault } from '$lib/utils/queryParsers';
  import { goto } from '$app/navigation';
  import type { iconType } from '$lib/components/Icon.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import UsersTab from '$lib/components/RouteComponents/Settings/UsersTab.svelte';
  import type { ComponentProps, ComponentType } from 'svelte';
  import GeneralTab from '$lib/components/RouteComponents/Settings/GeneralTab.svelte';
  import { noTypeCheck } from '$lib/utils/noTypeCheck.js';
  import TerminalTab from '$lib/components/RouteComponents/Settings/TerminalTab.svelte';

  export let data;

  const createConfig = <
    const T extends readonly ComponentType[],
    Config extends {
      [item in T[number] as string]: {
        component: item;
        label: String;
        icon: iconType;
        props: ComponentProps<InstanceType<item>>;
      };
    }
  >(
    elements: T,
    config: Config
  ) => config;

  const tabs = createConfig([GeneralTab, UsersTab], {
    server: {
      label: 'Server',
      icon: 'adjustments',
      component: GeneralTab,
      props: {}
    },
    users: {
      label: 'Users',
      icon: 'usersGroup',
      component: UsersTab,
      props: {
        usersPromise: data.streamed.users
      }
    },
    terminal: {
      label: 'Terminal',
      icon: 'terminal',
      component: TerminalTab,
      props: {}
    }
  });

  $: activeTab = oneOfOrDefault($page.url.searchParams.get('tab'), Object.keys(tabs), 'server');

  const onTabClick = (tab: keyof typeof tabs) => {
    const url = new URL($page.url);
    url.searchParams.set('tab', tab);
    goto(url.toString());
  };
</script>

<div class="h-full flex flex-col">
  <div class="flex justify-between items-center px-10">
    <h1 class="font-semibold text-xl text-color my-10">Settings</h1>

    <div>tab actions here</div>
  </div>

  <div class="flex gap-12 border-b px-10">
    {#each Object.entries(tabs) as [tabName, { icon, label }], idx (idx)}
      {@const isActive = activeTab === tabName}
      <button
        class={twMerge('pb-3 relative group flex items-center  justify-start gap-2 text-color')}
        on:click={() => onTabClick(tabName)}
      >
        <Icon name={icon} className="w-[15px] h-[15px]" />

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

  <div class="flex-1 overflow-auto">
    <svelte:component this={noTypeCheck(tabs[activeTab].component)} {...tabs[activeTab].props} />
  </div>
</div>
