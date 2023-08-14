<template>
  <div :class="classes">
    <button class="counter__decrement" @click.stop="decrement" :disabled="disabled">
      <VIcon width="14" height="14" name="minus" />
    </button>
    <input
      inputmode="numeric"
      type="number"
      @change="(e) => count = e.target?.value as string ?? ''"
      :value="count" class="counter__value"
    >
    <button class="counter__increment" @click.stop="increment" :disabled="disabled">
      <VIcon width="14" height="14" name="plus" />
    </button  >
  </div>
</template>

<script setup lang="ts">
import { VIcon } from '@/components/ui/VIcon';
import { computed, PropType } from 'vue';
import { useVModel } from '@vueuse/core';

type Emits = { (e: 'update:modelValue', value: number | string): void };
const emit = defineEmits<Emits>();

const props = defineProps({
  modelValue: {
    type: Number as PropType<number | string>,
    default: 0
  },
  theme: {
    type: String as PropType<'gray' | 'violet'>,
    default: 'gray'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number
  }
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

const classes = computed(() => ['counter', { [`counter--theme-${props.theme}`]: !!props.theme }]);
</script>

<style scoped lang="scss" src="./VCounter.scss"></style>
