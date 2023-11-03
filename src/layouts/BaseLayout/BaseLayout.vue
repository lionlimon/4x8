<template>
  <div class="base-layout">
    <header v-if="$slots.header" class="base-layout__header">
      <slot name="header" />
    </header>

    <div class="base-layout__content"><slot /></div>

    <div class="base-layout__footer">
      <BottomBar />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./BaseLayout.scss"></style>
<script setup lang="ts">
import { BottomBar } from '@/components/general/BottomBar';
</script>
