<template>
  <svg :height="height" :width="width" :style="styles()" aria-hidden="true" class="icon">
    <use :xlink:href="`#${name}`"/>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: '16'
  },
  height: {
    type: String,
    default: '16'
  },
  name: {
    type: String,
    required: true
  }
});

const styles = () => ({
  minWidth: props.width + 'px',
  minHeight: props.height + 'px',
})
</script>

<style lang="scss" scoped src="./VIcon.scss"/>
