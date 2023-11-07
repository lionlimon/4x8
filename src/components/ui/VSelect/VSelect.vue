<template>
  <label class="select">
    <span class="select__inner">
      <select class="select__input" v-model="selectValue">
        <option
          v-for="item in props.options"
          :key="item.value"
          :value="item.value"
        >
          {{ item.title }}
        </option>
      </select>
    </span>
    <span v-if="$slots.default" class="select__label"><slot /></span>
  </label>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

type Emits = {
  (e: 'update:modelValue', value: unknown): void
};
type Props = {
  options: { title: string, value: string | number }[];
  modelValue: unknown
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const selectValue = useVModel(props, 'modelValue', emit);
</script>

<style scoped lang="scss" src="./VSelect.scss"></style>
