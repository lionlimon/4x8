<template>
  <div class="counter">
    <button
      type="button"
      class="counter__decrement"
      @click.stop="decrement"
      :disabled="disabled">
      <VIcon width="14" height="14" name="minus" />
    </button>
    <label>
      <input
        inputmode="numeric"
        type="number"
        @change="(e) => count = (e.target as HTMLInputElement)?.value as string ?? ''"
        :value="count"
        class="counter__value"
      >
    </label>
    <button
      type="button"
      class="counter__increment"
      @click.stop="increment"
      :disabled="disabled">
      <VIcon width="14" height="14" name="plus" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { VIcon } from '@/components/ui/VIcon';

type Emits = { (e: 'update:modelValue', value: number | string): void };
type Props = {
  modelValue: number | string,
  disabled?: boolean,
  min?: number,
  max?: number | null,
};

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  min: 0,
  max: null,
});

const count = useVModel(props, 'modelValue', emit);

const increment = () => {
  if (props.max) {
    if (Number(count.value) < props.max) {
      count.value = Number(count.value) + 1;
    }
  } else {
    count.value = Number(count.value) + 1;
  }
};
const decrement = () => {
  if (Number(count.value) > props.min) {
    count.value = Number(count.value) - 1;
  }
};
</script>

<style scoped lang="scss" src="./VCounter.scss"></style>
