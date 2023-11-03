<template>
  <div class="top-bar container">
    <RouterLink v-if="backLink" class="top-bar__back" :to="backLink">
      <VIcon name="arrow-left" width="24px" height="24px" />
    </RouterLink>

    <div class="top-bar__info">
      <h1 class="top-bar__screen-title">
        <slot>{{ screenTitle }}</slot>
      </h1>

      <div v-if="title" class="top-bar__title">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { VIcon } from '@/components/ui/VIcon';

type Emits = {};
defineEmits<Emits>();

defineProps({
  screenTitle: {
    type: String,
    default: '',
  },

  title: {
    type: String,
    default: '',
  },

  backLink: {
    type: [Object, String] as PropType<RouteLocationRaw>,
    default: null,
  },
});
</script>

<style scoped lang="scss" src="./TopBar.scss"></style>
