<template>
  <div class="modal">
    <Sheet no-stretch only-header-swipe v-model:visible="isOpen">
      <div class="modal__header">
        <h4 v-if="title" class="modal__title">
          {{ title }}
        </h4>
        <p class="modal__sub-title" v-if="subTitle">{{ subTitle }}</p>
      </div>
      <div class="modal__inner">
        <slot></slot>
      </div>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
import {ref, onBeforeUnmount} from 'vue';
import { Sheet } from 'bottom-sheet-vue3'
import 'bottom-sheet-vue3/style.css'

type Emits = {
  (e: 'onOpen'): void;
  (e: 'onClose'): void;
};

const emit = defineEmits<Emits>();

const props = defineProps({
  title: {
    type: String,
    default: null
  },

  subTitle: {
    type: String,
    default: null
  }
});

const isOpen = ref(false);
const close = () => {
  isOpen.value = false
  emit('onClose');
};

onBeforeUnmount(() => close());

defineExpose({
  open() {
    isOpen.value = true
    emit('onOpen');
  },

  close,
});
</script>

<style scoped lang="scss" src="./VModal.scss"></style>
