<script lang="ts" context="module">
  const icons = {
    success: `
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
       
      >
        <path
          d="M10,1c-4.9,0-9,4.1-9,9s4.1,9,9,9s9-4,9-9S15,1,10,1z M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z"
        />
        <path
          fill="none"
          d="M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z"
          data-icon-path="inner-path"
          opacity="0"
        />
      </svg>
        `,
    error: `
    <svg
        class="st-toast-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        ><path
          d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z"
        /><path
          d="M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z"
          data-icon-path="inner-path"
          opacity="0"
        /></svg
      >
    `,
    info: `
    <svg
        class="st-toast-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        ><path
          d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1	s1,0.4,1,1S10.6,16,10,16z"
        /><path
          d="M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,16,10,16z"
          data-icon-path="inner-path"
          opacity="0"
        /></svg
      >`,
    warning: ''
  };

  type ShowToastOptions = {
    title?: string;
    description: string;
    duration?: number;
    type: 'success' | 'error' | 'info' | 'warning';
    delay?: number;
  };

  export const showToast = ({
    type,
    description,
    title,
    duration = 10000,
    delay = 0
  }: ShowToastOptions) => {
    setTimeout(() => {
      toasts.add({
        title,
        description,
        duration,
        type
      });
    }, delay);
  };
</script>

<script lang="ts">
  import { toasts, ToastContainer } from 'svelte-toasts';
  import { twMerge } from 'tailwind-merge';

  const variants = {
    info: 'border border-l-[3px] border-blue-600',
    success: 'border border-l-[3px] border-green-600 fill-green-500 bg-green-100',
    error: ' border border-l-[3px] border-red-600',
    warning: 'border border-l-[3px] border-orange-400'
  };
</script>

<ToastContainer let:data>
  <div
    class={twMerge(
      variants[data.type],
      'p-3 flex gap-4 items-start justify-start shadow-lg w-[320px] text-base text-color dark:bg-shadeD500 relative pointer-events-auto'
    )}
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    {@html icons[data.type]}

    <button
      class="absolute top-2 right-2"
      on:click={() => {
        if (data.remove) {
          data.remove();
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 32 32"
        class="fill-shadeL900"
      >
        <path
          d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"
        />
      </svg>
    </button>

    <div class="flex flex-col">
      {#if data.title}
        <h3 class="font-semibold">{data.title}</h3>
        <p>{data.description}</p>
      {/if}
    </div>
  </div>
</ToastContainer>
