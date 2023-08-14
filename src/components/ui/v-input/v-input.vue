<template>
  <label :class="['input', modifiers(), $attrs.class]">
    <span v-if="label" class="input__label">{{ label }}</span>
    <input
      v-model="inputValue"
      v-bind="$attrs"
      v-mask:[options]
      class="input__native"
      @blur="onBlur"
      @focus="onFocus"
      @animationstart="onAnimationStart"
    >
  </label>
</template>

<script setup lang="ts">
import {inject, reactive, ref, useAttrs} from "vue";
import { hasErrorSymbol } from "@ui/v-control";
import {useInputAutofillStatus} from "./useInputAutofillStatus";
import {useVModel} from "@vueuse/core";

defineOptions({ inheritAttrs: false });

type Emits = {
  (e: 'update:modelValue', value: string): void,
  (e: 'blur'): void;
};
const emit = defineEmits<Emits>();

type Props = {
  modelValue?: string,
  label?: string,
  mask?: string,
  digits?: boolean,
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  mask: '',
});

const attrs = useAttrs();

const options = reactive({
  mask: props.mask,
  eager: true
});

const { onAnimationStart, isAutofilled } = useInputAutofillStatus();

const isFocused = ref(false);

const inputValue = useVModel(props, 'modelValue', emit);

const onBlur = () => {
  isFocused.value = false
  emit('blur');
}

const onFocus = () => {
  isFocused.value = true;
}

const hasError = inject(hasErrorSymbol);

const labelIsActive = () => (isFocused.value || !!inputValue.value || isAutofilled.value);

const modifiers = () => ({
  'input--focused': isFocused.value,
  'input--has-value': !!inputValue.value,
  'input--has-error': hasError?.value,
  'input--active': labelIsActive(),
  'input--digits': props.digits,
  'input--disabled': attrs.disabled,
});
</script>

<style scoped lang="scss" src="./v-input.scss"></style>
