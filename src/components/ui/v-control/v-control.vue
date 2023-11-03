<template>
  <div :class="['control', modifiers()]">
    <slot />

    <TransitionGroup name="fade">
      <div key="text" v-if="text" class="control__text">
        {{ text }}
      </div>

      <div key="error" v-if="error" class="control__error">
        {{ error ?? text }} <VIcon v-if="error" name="error-circle" />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import VIcon from '@ui/VIcon/VIcon.vue';
import { hasErrorSymbol } from './injects';

const props = defineProps<{
  error?: string,
  text?: string,
  center?: boolean,
}>();

const hasErrors = computed(() => !!props.error);
provide(hasErrorSymbol, hasErrors);
const modifiers = () => ({
  'control--center': props.center,
});
</script>

<style scoped lang="scss" src="./v-control.scss"></style>
