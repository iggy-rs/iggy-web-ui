<script lang="ts">
  import Table from '$lib/components/Table.svelte';
  import type { User } from '$lib/domain/User';

  export let usersPromise: Promise<User[]>;
</script>

{#await usersPromise}
  loading users
{:then users}
  <Table
    data={users}
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
    noDataMessage="There is no users yet"
    colNames={{ id: 'Id', username: 'Username', createdAt: 'Created', status: 'Status' }}
  />
{/await}
