<template>
  <label class="month-picker">
    <input class="month-picker__input" v-model="currentDate" type="month" id="start" name="start" />
    {{ formatMonth(new Date(currentDate)) }}
    <VIcon class="month-picker__icon" name="arrow-down" width="24" height="24"/>
  </label>
</template>

<script setup lang="ts">
import {useVModel} from "@vueuse/core";
import {formatMonth} from "@/helpers/formatMonth";
import VIcon from "@ui/VIcon/VIcon.vue";

type Emits = {
  (e: 'update:modelValue', date: string): void
};
type Props = { modelValue: string }

const emit = defineEmits<Emits>();

const props = withDefaults( defineProps<Props>(), {
  modelValue: new Date().toISOString().slice(0,7),
});

const currentDate = useVModel(props, 'modelValue', emit);
</script>

<style scoped lang="scss" src="./VMonthPicker.scss"></style>
