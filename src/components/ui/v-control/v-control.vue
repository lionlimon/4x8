<template>
  <div :class="['control', modifiers()]">
    <slot />

    <transition-group name="fade">
      <div key="text" v-if="text" class="control__text">
        {{ text }}
      </div>

      <div key="error" v-if="error" class="control__error">
        {{ error ?? text }} <v-icon v-if="error" name="error-circle" />
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import {computed, provide} from "vue";
import { hasErrorSymbol } from "./injects";
import VIcon from "@ui/VIcon/VIcon.vue";

const props = defineProps<{
  error?: string,
  text?: string,
  center?: boolean,
}>();

const hasErrors = computed(() => !!props.error);
provide(hasErrorSymbol, hasErrors);
const modifiers = () => ({
  'control--center': props.center
})
</script>

<style scoped lang="scss" src="./v-control.scss"></style>
