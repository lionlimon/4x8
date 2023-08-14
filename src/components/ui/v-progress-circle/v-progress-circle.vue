<template>
  <div :class="['progress', {'progress--small': small}]" :style="{ '--segment-count': segmentsCount }">
    <div class="progress__number">
      {{ degree }}
    </div>
    <div
      v-for="(segment, index) of segmentsCount"
      :key="segment"
      :class="['progress__segment', { 'progress__segment--active': index <= percent }]"
      :style="{ '--i': index }"
    />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';

export default {
  name: 'v-progress-circle',
  props: {
    degree: {
      type: [Number, String],
      required: true
    },
    segmentsCount: {
      type: Number,
      required: false,
      default: 20
    },
    small: Boolean,
  },
  setup(props) {
    const percent = computed(() => (props.segmentsCount * ((Number(props.degree) / 360) * 100)) / 100);

    return {
      percent
    };
  }
};
</script>

<style lang="scss" src="./v-progress-circle.scss" scoped/>
