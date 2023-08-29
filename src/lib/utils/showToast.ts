import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';

const showToast = () => {
  const toast = toasts.add({
    title: 'Success',
    description: 'Form submitted successfully',
    duration: 3000, // 0 or negative to avoid auto-remove
    placement: 'bottom-right',
    type: 'info',
    theme: 'dark',
    onClick: () => {},
    onRemove: () => {}
    // component: BootstrapToast, // allows to override toast component/template per toast
  });
};
