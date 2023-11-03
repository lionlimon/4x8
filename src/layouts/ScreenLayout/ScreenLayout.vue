<template>
  <div class="screen-layout">
    <div v-if="$slots.header" class="screen-layout__header">
      <slot name="header" />
    </div>

    <div class="screen-layout__content container">
      <slot />
    </div>

    <div v-if="$slots.footer" class="screen-layout__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./ScreenLayout.scss"></style>
