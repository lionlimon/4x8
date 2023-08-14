<template>
  <div class="home-top-bar">
    <top-bar>
      <VMonthPicker v-model="currentMonth" />
    </top-bar>
  </div>
</template>

<script setup lang="ts">
import {TopBar} from "@/components/general/TopBar";
import {useCalendarStore} from "@/stores/calendar";
import {VMonthPicker} from "@ui/VMonthPicker";
import {ref, watch} from "vue";

const calendarStore = useCalendarStore();

type Emits = {};
const emit = defineEmits<Emits>();

const currentMonth = ref(calendarStore.currentMonth);
watch(currentMonth, () => calendarStore.setMonth(currentMonth.value));
</script>

<style scoped lang="scss" src="./HomeTopBar.scss"></style>
