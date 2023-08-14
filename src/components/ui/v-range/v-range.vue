<template>
  <div class="input-range">
    <input
      ref="input"
      :max="max"
      :min="min"
      :value="modelValue"
      class="input-range__input"
      type="range"
      v-bind="$attrs"
      @input="handleInput"
    />
    <div ref="label" class="input-range__label">
      {{ modelValue }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { IRangeEmits, IRangeProps } from '@ui/v-range/types';

const emit = defineEmits<IRangeEmits>();

const props = withDefaults(defineProps<IRangeProps>(), {
  min: 0,
  max: 100,
  modelValue: 50
});

const input = ref<HTMLInputElement | null>(null);
const label = ref<HTMLDivElement | null>(null);

const getPercent = () => {
  return (Number(props.modelValue) / (props.max - props.min)) * 100;
};

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit('update:modelValue', value);
};

watchEffect(() => {
  if (input.value) {
    input.value.style.setProperty('--progress-percent', `${getPercent()}%`);

    if (label.value) {
      const thumbSize = 30;
      const inputWidth = input.value.offsetWidth;
      const inputValue = Number(input.value.value);

      const left = ((inputValue - props.min) / (props.max - props.min)) * (inputWidth - thumbSize);

      label.value.style.left = `${left}px`;
    }
  }
});
</script>

<style lang="scss" scoped src="./v-range.scss"></style>
