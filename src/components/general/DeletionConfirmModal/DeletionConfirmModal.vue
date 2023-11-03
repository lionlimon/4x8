<template>
  <VModal
    ref="bottomSheet"
    :title="text"
    class="deletion-confirm-modal"
  >
    <div class="container">
      <VButton
        class="deletion-confirm-modal__button"
        theme="dangerous"
        @click="onConfirmClick"
        size="m"
        wide
      >
        {{ buttonText }}
      </VButton>
    </div>
  </VModal>
</template>

<script setup lang="ts">
import { VModal } from '@ui/VModal';
import { VButton } from '@ui/VButton';
import { ref } from 'vue';

type Emits = { (e: 'confirm'): void };
type Props = {
  text?: string,
  buttonText?: string
};

const emit = defineEmits<Emits>();

withDefaults(defineProps<Props>(), {
  text: 'Вы действительно хотите удалить?',
  buttonText: 'Удалить',
});

const bottomSheet = ref<InstanceType<typeof VModal>>();

const onConfirmClick = () => {
  bottomSheet.value?.close();
  emit('confirm');
};

defineExpose({
  open: () => bottomSheet.value?.open(),
  close: () => bottomSheet.value?.close(),
});
</script>

<style scoped lang="scss" src="./DeletionConfirmModal.scss"></style>
