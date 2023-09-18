<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  import Icon from '$lib/components/Icon.svelte';
  import Input from '$lib/components/Input.svelte';
  import { typedRoute } from '$lib/types/appRoutes';
</script>

<div class="min-w-[350px] max-w-[400px] bg-white p-5 rounded-2xl card-shadow flex flex-col gap-5">
  <span class="mx-auto">Admin sign up</span>

  <Input idAndName="email" label="Email" id="email" />
  <Input idAndName="password" label="Password" type="password" />
  <Input idAndName="confirmPassword" label="Confirm password" type="password" />

  <Button variant="contained" size="lg" class="mt-7">
    <span> Sign up </span>
    <Icon name="login" className="w-[23px] h-[23px]" />
  </Button>

  <a href={typedRoute('/auth/login')} class="text-sm mx-auto hover:underline">
    Already have an account? Sign in
  </a>
</div>
