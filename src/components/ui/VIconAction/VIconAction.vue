<template>
  <VButton
    :variant="variant"
    :size="size"
    :theme="theme"
    class="icon-action"
  >
    <VIcon :name="icon" />
  </VButton>
</template>

<script setup lang="ts">
import {
  VButton, ButtonSize, ButtonVariant, ButtonTheme,
} from '@ui/VButton';
import { VIcon } from '@ui/VIcon';

type Emits = {};
type Props = {
  icon: string,
  variant?: ButtonVariant,
  size?: ButtonSize,
  theme?: ButtonTheme,
};

defineEmits<Emits>();

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 's',
  theme: 'default',
});
</script>

<style scoped lang="scss" src="./VIconAction.scss"></style>
