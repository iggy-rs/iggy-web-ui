<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Input from '$lib/components/Input.svelte';
  import { typedRoute } from '$lib/types/appRoutes.js';
  import { superForm, superValidateSync } from 'sveltekit-superforms/client';
  import { z } from 'zod';

  export let data;

  const schema = z.object({
    newPassword: z.string().min(6, 'Password must contain at least 6 characters')
  });

  const { form, errors, enhance, constraints, submitting } = superForm(superValidateSync(schema), {
    SPA: true,
    validators: schema,
    taintedMessage: false,
    async onUpdate({ form }) {
      if (!form.valid) return;
    }
  });
</script>

<form
  method="POST"
  use:enhance
  class="min-w-[350px] max-w-[400px] bg-white p-5 rounded-2xl card-shadow flex flex-col gap-5"
>
  <span class="mx-auto">Reset passowrd</span>

  <Input
    label="New password"
    idAndName={'newPassword'}
    error={$errors.newPassword?.join(',')}
    bind:value={$form.newPassword}
    {...$constraints.newPassword}
  />

  <Button variant="contained" size="lg" class="mt-7" type="submit">
    <span> Reset </span>
  </Button>

  <a href={typedRoute('/auth/login')} class="text-sm mx-auto hover:underline"> Sign up </a>
</form>
