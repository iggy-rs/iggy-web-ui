<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Input from '$lib/components/Input.svelte';
</script>

<div class="flex gap-5 items-center">
  <span class="text-sm text-color-gray"> 12 users </span>
  <Input placeholder="Search" idAndName="searchUser" class="w-[145px]" leadingIcon="search" />
  <Button variant="contained">
    <Icon name="plus" />
    Add user
  </Button>
</div>
