<template>
  <div class="action-buttons">
    <VButton
      class="action-buttons__add-button"
      size="m"
      variant="outline"
      wide
      @click="emit('add-approach-click')"
    >
      <VIcon name="plus" /> Добавить подход
    </VButton>

    <VButton
      :disabled="disabled"
      size="m"
      wide
      @click="emit('save-click')"
    >
      Сохранить
    </VButton>
  </div>
</template>

<script setup lang="ts">
import { VIcon } from '@ui/VIcon';
import { VButton } from '@ui/VButton';

type Emits = {
  (e: 'add-approach-click'): void,
  (e: 'save-click'): void,
};

type Props = {
  disabled: boolean
};

const emit = defineEmits<Emits>();
defineProps<Props>();
</script>

<style scoped lang="scss" src="./ActionButtons.scss"></style>
