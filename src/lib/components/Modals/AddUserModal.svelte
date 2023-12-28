<script lang="ts">
  import type { CloseModalFn } from '$lib/types/utilTypes';
  import Listbox from '../Listbox.svelte';
  import Input from '../Input.svelte';
  import z from 'zod';
  import ModalBase from './ModalBase.svelte';
  import { superForm, superValidateSync } from 'sveltekit-superforms/client';
  import PasswordInput from '../PasswordInput.svelte';
  import Button from '../Button.svelte';
  import PermissionsManager from '../PermissionsManager.svelte';

  import type { Stream } from '$lib/domain/Stream';

  export let closeModal: CloseModalFn;
  export let streams: Stream[];

  const schema = z.object({
    username: z.string().min(1).trim(),
    password: z.string().min(4, { message: 'Password must contain at least 4 characters' }).trim(),
    status: z.enum(['active', 'inactive'])
  });

  const { form, errors, enhance, constraints } = superForm(superValidateSync(schema), {
    SPA: true,
    validators: schema,

    async onUpdate({ form }) {
      if (!form.valid) return;
      console.log('add user form valid');
    }
  });
</script>

<ModalBase {closeModal} title="Add User">
  <div class="h-[600px] flex flex-col">
    <form method="POST" class="h-[450px] gap-4" use:enhance>
      <div class="grid grid-cols-3 gap-4 min-w-[800px]">
        <Input
          label="Username"
          name="username"
          bind:value={$form.username}
          {...$constraints.username}
          errorMessage={$errors.username?.join(',')}
        />

        <PasswordInput
          label="Password"
          name="password"
          errorMessage={$errors.password?.join(',')}
          bind:value={$form.password}
          {...$constraints.password}
        />

        <Listbox
          label="Status"
          options={[
            { name: 'Active', value: 'active' },
            { name: 'Inactive', value: 'inactive' }
          ]}
          selectedValue="active"
        />
      </div>

      <PermissionsManager {streams} />
    </form>
    <div class="flex justify-end gap-3 mt-auto w-[350px] ml-auto">
      <Button variant="text" type="button" class="w-2/5" on:click={() => closeModal()}
        >Cancel</Button
      >
      <Button type="submit" variant="contained" class="w-2/5">Add</Button>
    </div>
  </div>
</ModalBase>
