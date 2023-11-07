<template>
  <Sheet
    :class="['modal', modifiers]"
    no-stretch
    only-header-swipe
    v-model:visible="isOpen"
    @close="emit('on-close')"
  >
    <div class="modal__header">
      <div class="modal__header-info">
        <h4 v-if="title" class="modal__title">
          {{ title }}
        </h4>
        <p class="modal__sub-title" v-if="subTitle">{{ subTitle }}</p>
      </div>

      <div v-if="$slots.actions" class="modal__actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="modal__inner">
      <slot />
    </div>
  </Sheet>
</template>

<script setup lang="ts">
import {
  ref, onBeforeUnmount, watch, computed,
} from 'vue';
import { Sheet } from 'bottom-sheet-vue3';
import 'bottom-sheet-vue3/style.css';
import { useScrollLock } from '@vueuse/core';

type Emits = {
  (e: 'on-open'): void;
  (e: 'on-close'): void;
};

const emit = defineEmits<Emits>();

const props = defineProps({
  title: {
    type: String,
    default: null,
  },

  subTitle: {
    type: String,
    default: null,
  },

  fullHeight: {
    type: Boolean,
    default: false,
  },
});

const scrollIsLocked = useScrollLock(document.body);
const isOpen = ref(false);

watch(isOpen, () => {
  scrollIsLocked.value = isOpen.value;
});

const close = () => {
  isOpen.value = false;
  emit('on-close');
};

const modifiers = computed(() => ({
  'modal--full-height': props.fullHeight,
}));

onBeforeUnmount(() => close());

defineExpose({
  open() {
    isOpen.value = true;
    emit('on-open');
  },

  close,
});
</script>

<style scoped lang="scss" src="./VModal.scss"></style>
