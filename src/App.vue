<template>
  <RouterView v-slot="{ Component }">
    <BaseLayout>
      <Transition name="layout-fade" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </BaseLayout>
  </RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import BaseLayout from '@/layouts/BaseLayout/BaseLayout.vue';
</script>

<style lang="scss" src="./assets/style/index.scss" />
