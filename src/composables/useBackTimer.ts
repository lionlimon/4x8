import { useStorage } from '@vueuse/core';
import { onUnmounted } from 'vue';

export const useBackTimer = (initialMilliSeconds: number = 0) => {
  const currentTime = useStorage(`currentTime-${initialMilliSeconds}`, initialMilliSeconds);

  const interval = setInterval(() => {
    if (currentTime.value) {
      currentTime.value -= 1000;
    }
  }, 1000);

  const minutes = () => Math.floor(currentTime.value / 60000);

  const seconds = () => Math.floor((currentTime.value % 60000) / 1000);

  const secondsFormatted = () => (seconds() < 10 ? `0${seconds()}` : seconds());
  const minutesFormatted = () => (minutes() < 10 ? `0${minutes()}` : minutes());

  onUnmounted(() => {
    clearInterval(interval);
  });

  return {
    minutes, seconds, minutesFormatted, secondsFormatted, currentTime,
  };
};
