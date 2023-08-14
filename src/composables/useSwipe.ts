import { ref } from 'vue';
import { useEventListener } from '@vueuse/core';

export interface IUseSwipeOptions {
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
}

export const useSwipe = (target: HTMLElement, options: IUseSwipeOptions) => {
  const xDown = ref<number | null>(null);
  const yDown = ref<number | null>(null);

  const handleTouchStart = (evt: TouchEvent) => {
    xDown.value = evt.touches[0].clientX;
    yDown.value = evt.touches[0].clientY;
  };

  const handleTouchMove = (evt: TouchEvent) => {
    if (!xDown.value || !yDown.value) {
      return;
    }
    const xUp: number = evt.touches[0].clientX;
    const yUp: number = evt.touches[0].clientY;

    const xDiff = xDown.value - xUp;
    const yDiff = yDown.value - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        if (options.onLeft) options.onLeft();
      } else {
        if (options.onRight) options.onRight();
      }
    } else {
      if (yDiff > 0) {
        if (options.onUp) options.onUp();
      } else {
        if (options.onDown) options.onDown();
      }
    }
  };
  const handleTouchEnd = () => {
    xDown.value = null;
    yDown.value = null;
  };

  useEventListener(target, 'touchstart', handleTouchStart);
  useEventListener(target, 'touchmove', handleTouchMove);
  useEventListener(target, 'touchend', handleTouchEnd);
};
