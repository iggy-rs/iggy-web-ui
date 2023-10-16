<script lang="ts" context="module">
  import { writable } from 'svelte/store';
  export const searchQuery = writable('');
  export const usersCount = writable<undefined | number>();
  export const selectedUsers = writable<User[]>([]);
</script>

<script lang="ts">
  import type { User } from '$lib/domain/User';
  import SortableList from '$lib/components/SortableList.svelte';
  import PromiseLoader from '$lib/components/PromiseLoader.svelte';

  export let usersPromise: Promise<User[]>;
</script>

<PromiseLoader
  promise={usersPromise}
  loadingMessage="users"
  let:resolvedData={users}
  onData={(data) => {
    $usersCount = data.length;
  }}
>
  <SortableList
    emptyDataMessage="No users found."
    on:selection={(e) => {
      $selectedUsers = e.detail.items;
    }}
    data={users.filter((user) => user.username.toLowerCase().includes($searchQuery.toLowerCase()))}
    disabledIds={[1]}
    areRowsSelectable={true}
    actions={[
      [
        {
          label: 'Edit',
          icon: 'editPen',
          action: (close) => {
            console.log('edit action');
            close();
          }
        },
        {
          label: 'Permissions',
          icon: 'shieldLock',
          action: (close) => {
            console.log('permissions action');
          }
        },
        {
          label: 'Delete',
          icon: 'trash',
          action: (close) => {
            console.log('delete action');
          }
        }
      ]
    ]}
    colNames={{ id: 'Id', username: 'Username', createdAt: 'Created', status: 'Status' }}
    rowClass="grid grid-cols-[150px_4fr_3fr_2fr]"
    let:item={row}
  >
    <svelte:fragment>
      <div class=" px-5 w-[150px] font-semibold">
        {row.id}
      </div>

      <div class="px-5">
        <span class="whitespace-nowrap">
          {row.username}
        </span>
      </div>

      <div class="px-5 whitespace-nowrap">
        {row.createdAt}
      </div>

      <div class="px-5">
        <span
          class="rounded-full px-2 py-1 {row.status === 'active'
            ? 'bg-green500 '
            : ''} text-white text-sm"
        >
          {row.status}
        </span>
      </div>
    </svelte:fragment>
  </SortableList>
</PromiseLoader>
