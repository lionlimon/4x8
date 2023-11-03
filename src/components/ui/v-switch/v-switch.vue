<template>
  <label :for="uid" class="switch">
    <input
      :id="uid"
      v-bind="$attrs"
      :checked="modelValue"
      type="checkbox"
      @change="onChange" />
    <span class="slider" />
  </label>
</template>

<script lang="ts">
import { computed, getCurrentInstance } from 'vue';

export default {
  name: 'VSwitch',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(_, { emit }) {
    const uid = computed(() => {
      const instance = getCurrentInstance();
      if (!instance?.uid) { return ''; }
      return `switch-${instance.uid}`;
    });

    const onChange = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).checked);
    };

    return {
      uid,
      onChange,
    };
  },
};
</script>

<style lang="scss" scoped src="./v-switch.scss" />
