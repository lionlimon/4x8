<template>
  <div ref="wrapper" :class="['base-layout', modifiers()]" @scroll="onScroll">
    <header v-if="$slots.header" class="base-layout__header">
      <slot name="header" />
    </header>

    <div class="base-layout__content container"><slot /></div>

    <div v-if="$slots.footer" class="base-layout__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

type Emits = {
  (e: 'on-scroll-end'): void
}

const emit = defineEmits<Emits>();

const props = defineProps<{
  staticHeader?: boolean,
  noScroll?: boolean,
}>();

const wrapper = ref<HTMLElement | null>(null);

const modifiers = () => ({
  'base-layout--static-header': props.staticHeader,
  'base-layout--no-scroll': props.noScroll
});

const onScroll = () => {
  if (!wrapper.value) { return; }

  const offset = 60;
  if (wrapper.value.offsetHeight + wrapper.value.scrollTop + offset >= wrapper.value.scrollHeight) {
    emit('on-scroll-end');
  }
}
</script>

<style scoped lang="scss" src="./BaseLayout.scss"></style>
