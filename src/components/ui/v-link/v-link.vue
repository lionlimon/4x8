<template>
  <component :is="tag()" :to="to" class="v-link">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import {useAttrs} from "vue";
import {RouteLocationRaw} from "vue-router";

const props = defineProps<{
  to?: RouteLocationRaw
}>();

const attrs = useAttrs();
const tag = () => {
  if (attrs.href) {return 'a';}
  if (props.to) {return 'router-link';}

  return 'button';
}
</script>

<style scoped lang="scss" src="./v-link.scss"></style>
