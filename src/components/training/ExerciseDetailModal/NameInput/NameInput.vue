<template>
  <label class="name-input">
    <input
      v-model="name"
      type="text"
      placeholder="Введите название"
      class="name-input__input"
    >
  </label>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

type Emits = {

  (e: 'update:modelValue', value: string): void
};
type Props = {
  modelValue: string
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const name = useVModel(props, 'modelValue', emit);
</script>

<style scoped lang="scss" src="./NameInput.scss"></style>
