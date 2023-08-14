<template>
  <component :is="tag" class="card">
    <div v-if="$slots.header" class="card__header">
      <slot name="header"></slot>
    </div>

    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Emits = {};
defineEmits<Emits>();

const props = defineProps({
  isButton: {
    type: Boolean,
    default: false
  }
});

const tag = computed(() => (props.isButton ? 'button' : 'div'));
</script>

<style scoped lang="scss" src="./v-card.scss"></style>
