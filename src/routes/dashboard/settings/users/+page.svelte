<script lang="ts" context="module">
  import { writable } from 'svelte/store';
  export const searchQuery = writable('');
  export const usersCount = writable<undefined | number>();
  export const selectedUsersId = writable<string[]>([]);
</script>

<script lang="ts">
  import SlimSortableList from '$lib/components/SlimSortableList.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import { twMerge } from 'tailwind-merge';
  import Button from '$lib/components/Button.svelte';
  import Icon, { type iconType } from '$lib/components/Icon.svelte';
  import DropdownMenu from '$lib/components/DropdownMenu/DropdownMenu.svelte';
  import StopPropagation from '$lib/components/StopPropagation.svelte';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';
  import SettingsLayout from '$lib/components/Layouts/SettingsLayout.svelte';
  import { fade } from 'svelte/transition';
  import Input from '$lib/components/Input.svelte';

  export let data;

  $usersCount = data.users.length;
  $: filteredUsers = data.users.filter((user) =>
    user.username.toLowerCase().includes($searchQuery.toLowerCase())
  );

  const userActions = [
    {
      label: 'Edit',
      icon: 'editPen',
      action: () => {
        openModal('EditUserModal');
      }
    },
    {
      label: 'Permissions',
      icon: 'shieldLock',
      action: () => {
        openModal('EditUserPermissionsModal');
      }
    },
    {
      label: 'Delete',
      icon: 'trash',
      action: () => {
        openModal('DeleteUserModal');
      }
    }
  ] satisfies { label: string; icon: iconType; action: VoidFunction }[];

  const toggleAllChecked = (e: Event) => {
    const { checked } = e.target as HTMLInputElement;

    $selectedUsersId = checked
      ? data.users.filter((user) => user.id !== 1).map((user) => `${user.id}`)
      : [];
  };

  $: allChecked = data.users
    .filter((user) => user.id !== 1)
    .every((user) => $selectedUsersId.includes(user.id.toString()));
</script>

<SettingsLayout>
  <div slot="actions" class="flex flex-col-reverse lg:flex-row gap-3 lg:gap-5 items-center">
    {#if $selectedUsersId.length > 0}
      <div class="mr-auto flex gap-2" transition:fade={{ duration: 50 }}>
        <Button variant="containedRed">
          <Icon name="trash" />
          Delete selected</Button
        >
        <Button variant="contained">
          <Icon name="shieldLock" />
          Change permissions</Button
        >
      </div>
    {/if}

    <div class="flex items-center gap-4">
      {#if $usersCount}
        <span class="text-sm text-color-gray"> {$usersCount} users </span>
        <div class="max-w-[170px]">
          <Input bind:value={$searchQuery} placeholder="Search" name="search">
            <span slot="prefix">
              <Icon name="search" />
            </span>
          </Input>
        </div>

        <Button
          variant="contained"
          on:click={() =>
            openModal('AddUserModal', {
              streams: data.streams
            })}
        >
          <Icon name="plus" />
          Add user
        </Button>
      {/if}
    </div>
  </div>

  <SlimSortableList
    data={filteredUsers}
    emptyDataMessage=""
    gridColsClass="grid-cols-[100px_150px_3fr_2fr_2fr_120px]"
    columns={[
      {
        slot: true
      },
      {
        key: 'id',
        label: 'Id',
        sortable: true
      },
      {
        key: 'username',
        label: 'Username',
        sortable: true
      },
      {
        key: 'createdAt',
        label: 'Created',
        sortable: true
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true
      },
      { label: 'Actions', sortable: false }
    ]}
    let:item={row}
    let:baseClass
  >
    <div class="flex items-center justify-center" slot="header">
      <Checkbox value="all" checked={allChecked} on:change={toggleAllChecked} />
    </div>

    <label
      for="{row.id}-{row.username}"
      class={twMerge(
        baseClass,
        row.id === 1 && 'bg-shadeL800 dark:bg-shadeD1000 pointer-events-none',
        $selectedUsersId.includes(row.id.toString()) &&
          'ring-2 ring-inset ring-green500 !bg-green-300/30  '
      )}
    >
      <div class="flex items-center justify-center">
        {#if row.id !== 1}
          <Checkbox
            value={row.id.toString()}
            bind:bindGroup={$selectedUsersId}
            checked={false}
            id="{row.id}-{row.username}"
          />
        {/if}
      </div>
      <div class=" px-5 font-semibold">
        {row.id}
      </div>

      <div class="px-5">
        <span class="whitespace-nowrap">
          {row.username}
        </span>
      </div>

      <div class=" whitespace-nowrap px-5">
        {row.createdAt}
      </div>

      <div class="px-5">
        <span
          class={twMerge(
            'rounded-full block w-[70px] text-center p-1 text-white text-sm capitalize',
            row.status === 'active' ? 'bg-green500' : 'bg-shadeD100 dark:bg-shadeD400'
          )}
        >
          {row.status}
        </span>
      </div>
      <div class="px-5">
        {#if row.id !== 1}
          <StopPropagation>
            <DropdownMenu placement="left-start" let:close>
              <Button variant="rounded" class="" slot="trigger">
                <Icon name="verticalDots" />
              </Button>
              <div>
                {#each userActions as { action, icon, label }}
                  <button
                    on:click={() => {
                      action();
                      close();
                    }}
                    class={twMerge(
                      ' grid grid-cols-[20px,1fr] gap-x-1 rounded-md items-center w-full px-2 py-2 text-sm text-color cursor-default hoverable-strong'
                    )}
                  >
                    <span>
                      <Icon name={icon} class="w-[17px] h-[17px]" />
                    </span>
                    <span class={twMerge('text-left')}>
                      {label}
                    </span>
                  </button>
                {/each}
              </div>
            </DropdownMenu>
          </StopPropagation>
        {/if}
      </div>
    </label>
  </SlimSortableList>
</SettingsLayout>
