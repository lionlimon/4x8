import { ref } from 'vue';

/**
 * Hack for fixing chrome autofill bug. Also, you need to add that styles to input
 *
 * ```css
 *     :-webkit-autofill {
 *       animation-name: onAutoFillStart;
 *     }
 *     :not(:-webkit-autofill) {
 *       animation-name: onAutoFillCancel;
 *     }
 * ```
 * @link https://rojas.io/how-to-detect-chrome-autofill-with-vue-js/
 */
export const useInputAutofillStatus = () => {
  const isAutofilled = ref(false);
  const onAnimationStart = (e: { animationName:string }) => {
    if (e.animationName.includes('on-auto-fill-start')) {
      isAutofilled.value = true;
    } else if (e.animationName.includes('on-auto-fill-cancel')) {
      isAutofilled.value = false;
    }
  };

  return { isAutofilled, onAnimationStart };
};
