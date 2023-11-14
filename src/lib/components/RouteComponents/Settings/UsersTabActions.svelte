<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Input from '$lib/components/Input.svelte';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';
  import { searchQuery, selectedUsers, usersCount } from './UsersTab.svelte';
</script>

<div class="flex gap-5 items-center">
  <div class="mr-10 flex gap-2">
    {#if $selectedUsers.length > 0}
      <Button variant="containedRed">
        <Icon name="trash" />
        Delete selected</Button
      >
      <Button variant="contained">
        <Icon name="shieldLock" />
        Change permissions</Button
      >
    {/if}
  </div>

  {#if $usersCount}
    <span class="text-sm text-color-gray"> {$usersCount} users </span>
    <!-- 
    <Input
      bind:value={$searchQuery}
      placeholder="Search"
      idAndName="searchUser"
      class="w-[165px]"
      leadingIcon="search"
    /> -->
    <Button variant="contained" on:click={() => openModal('addUserModal')}>
      <Icon name="plus" />
      Add user
    </Button>
  {/if}
</div>
