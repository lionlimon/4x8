<template>
  <div v-if="!hideDelimiter" class="card-delimiter" />
  <slot />
</template>

<script setup lang="ts">
defineProps<{
  hideDelimiter?: boolean
}>();
</script>

<style scoped lang="scss" src="./v-card-delimiter.scss"></style>
