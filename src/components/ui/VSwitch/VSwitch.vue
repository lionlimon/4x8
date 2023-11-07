<template>
  <label class="switch">
    <span class="switch__inner">
      <input
        class="switch__input"
        v-bind="$attrs"
        :checked="modelValue"
        type="checkbox"
        @change="onChange"
      />
      <span class="switch__slider" />
    </span>

    <span v-if="$slots.default" class="switch__label"><slot /></span>
  </label>
</template>

<script setup lang="ts">

type Props = {
  modelValue: boolean
};

type Emits = {
  (e: 'update:modelValue', value: boolean): void
};

const emit = defineEmits<Emits>();
defineProps<Props>();

const onChange = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).checked);
};
</script>

<style lang="scss" scoped src="./VSwitch.scss" />
