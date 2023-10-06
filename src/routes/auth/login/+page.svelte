<script lang="ts">
  import { updated } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Input from '$lib/components/Input.svelte';
  import { typedRoute } from '$lib/types/appRoutes.js';

  import { writable } from 'svelte/store';
  import { superForm } from 'sveltekit-superforms/client';

  export let data;
  const { form, constraints, errors, message } = superForm(data.form);

  let rememberMe = true;

  // const loginData = persisted('loginData', { rememberMe: true });
</script>

<form
  method="POST"
  class="min-w-[350px] max-w-[400px] bg-white dark:bg-shadeD700 text-color p-5 rounded-2xl card-shadow dark:shadow-lg flex flex-col gap-5"
>
  <span class="mx-auto font-semibold">Admin sign in</span>

  <Input
    label="Name"
    idAndName={'name'}
    error={$errors.name?.join(',')}
    bind:value={$form.name}
    {...$constraints.name}
  />
  <Input
    label="Password"
    idAndName={'password'}
    type="password"
    error={$errors.password?.join(',')}
    bind:value={$form.password}
    {...$constraints.password}
  />

  {#if $message}
    <span class="text-sm mx-auto text-red-600">{$message}</span>
  {/if}

  <div class="flex justify-between items-center">
    <label class="flex gap-1 items-center w-fit">
      <!-- <Checkbox bind:checked={$loginData.rememberMe} /> -->
      <span class="text-xs font-light">Remember me</span>
    </label>

    <a href={typedRoute('/auth/reset-password')} class="text-xs font-light hover:underline">
      Forgotten password?
    </a>
  </div>

  <Button variant="contained" size="lg" class="mt-7" type="submit">
    <span> Login </span>
    <Icon name="login" className="w-[23px] h-[23px]" />
  </Button>

  <a href={typedRoute('/auth/register')} class="text-sm mx-auto hover:underline">
    No account? Sign up
  </a>
</form>
