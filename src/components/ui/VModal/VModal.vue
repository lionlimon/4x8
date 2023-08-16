<template>
  <div class="modal">
    <VueBottomSheet :max-height="500" :transition-duration="0.3" ref="bottomSheet">
      <h4 v-if="title" class="modal__title">
        {{ title }}
      </h4>
      <p class="modal__sub-title" v-if="subTitle">{{ subTitle }}</p>
      <slot></slot>
    </VueBottomSheet>
  </div>
</template>

<script setup lang="ts">
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import {ref, onBeforeUnmount} from 'vue';

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

const bottomSheet = ref<InstanceType<typeof VueBottomSheet>>();

const close = () => {
  bottomSheet.value?.close();
  emit('onClose');
};

onBeforeUnmount(() => close());

defineExpose({
  open() {
    bottomSheet.value?.open();
    emit('onOpen');
  },

  close,
});
</script>

<style scoped lang="scss" src="./VModal.scss"></style>
