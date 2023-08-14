<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition as string">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style lang="scss" src="./assets/style/index.scss" />
