import { ref } from 'vue';

export const useIsOpenedState = (initialValue: boolean = false) => {
  const isOpened = ref(initialValue);
  const open = () => (isOpened.value = true);
  const close = () => (isOpened.value = false);
  const toggle = () => (isOpened.value = !isOpened.value);

  return {
    isOpened,
    open,
    close,
    toggle,
  };
};
