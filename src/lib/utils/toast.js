import { writable } from 'svelte/store';

export const toastStore = writable({
  show: false,
  message: '',
  type: 'info',
  duration: 3000
});

export const showToast = (message, type = 'info', duration = 3000) => {
  toastStore.set({
    show: true,
    message,
    type,
    duration
  });
};