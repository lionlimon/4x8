<template>
  <MainFooter class="bottom-bar">
    <nav>
      <ul class="bottom-bar__list">
        <li v-for="menuItem in menu" :key="menuItem.pageName">
          <RouterLink class="bottom-bar__list-link" :to="{ name: menuItem.pageName }">
            <VIcon width="25" height="25" :name="menuItem.icon" />
            {{ menuItem.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </MainFooter>
</template>

<script setup lang="ts">
import { MainFooter } from '@/components/general/MainFooter';
import { menu } from '@/constants/menu';
import VIcon from '@ui/VIcon/VIcon.vue';
</script>

<style scoped lang="scss" src="./BottomBar.scss"></style>
