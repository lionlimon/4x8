<template>
  <label :for="uid" class="checkbox-wrap">
    <span class="checkbox">
      <input
        :id="uid"
        v-bind="$attrs"
        :disabled="disabled"
        :false-value="falseValue"
        :true-value="trueValue"
        v-model="computedValue"
        :value="value"
        class="checkbox__input"
        tabindex="0"
        type="checkbox"
      />
      <span class="checkbox__check">
        <VIcon height="12px" name="check" width="12px" />
      </span>
    </span>
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import { VIcon } from 'src/components/ui/VIcon';
import { ICheckboxEmits, ICheckboxProps } from '@ui/v-checkbox/types';
import { useVModel } from '@vueuse/core/index';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<ICheckboxEmits>();
const props = withDefaults(defineProps<ICheckboxProps>(), {
  modelValue: '',
  disabled: false,
  falseValue: false,
  trueValue: true,
  value: '',
});

const computedValue = useVModel(props, 'modelValue', emit);

const uid = computed(() => {
  const instance = getCurrentInstance();
  return `checkbox-${instance?.uid}`;
});
</script>

<style scoped lang="scss" src="./v-checkbox.scss"></style>
