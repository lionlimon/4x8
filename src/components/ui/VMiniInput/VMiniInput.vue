<template>
  <input class="mini-input" v-model="value">
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

type Emits = { (e: 'update:modelValue', value: string | number): void };
const emit = defineEmits<Emits>();

const props = defineProps<{
  modelValue: string | number,
}>();

const value = useVModel(props, 'modelValue', emit);
</script>

<style scoped lang="scss" src="./VMiniInput.scss"></style>
