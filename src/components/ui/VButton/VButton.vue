<template>
  <Component
    :is="component()"
    :to="to"
    :href="href"
    :class="['button', modifiers()]">
    <VPointLoader class="button__loader" v-if="loading" />
    <slot />
  </Component>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { VPointLoader } from '@ui/VPointLoader';

const props = defineProps({
  to: {
    type: [Object, String] as PropType<RouteLocationRaw>,
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  variant: {
    type: String as PropType<'default' | 'outline'>,
    default: 'default',
  },
  size: {
    type: String as PropType<'m' | 's'>,
    default: 's',
  },
  wide: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },

  loading: {
    type: Boolean,
    default: false,
  },
});

const component = () => {
  if (props.to) { return 'router-link'; }
  if (props.href) { return 'a'; }
  return 'button';
};

const modifiers = () => ({
  [`button--${props.variant}`]: props.variant,
  [`button--size-${props.size}`]: props.size,
  'button--wide': props.wide,
  'button--loading': props.loading,
  'button--disabled': props.disabled,
});
</script>

<style scoped lang="scss" src="./VButton.scss"></style>
