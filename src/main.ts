import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'
import { vMaska } from 'maska';
import FloatingVue from 'floating-vue';
import {createBottomSheet} from "bottom-sheet-vue3";

const modules = import.meta.glob('./assets/icons/*.svg');
Object.values(modules).forEach(async (el) => await el());

const app = createApp(App);
const pinia = createPinia();

app.directive('mask', vMaska);
app.use(createBottomSheet())
app.use(pinia);
app.use(router);
app.use(FloatingVue, {
  themes: {
    'my-tooltip': {
      $extend: 'tooltip',
      triggers: ['click', 'touch'],
      autoHide: true,
      placement: 'bottom',
      strategy: 'fixed',
      positioningDisabled: true,
      overflowPadding: 8
    }
  }
});
app.mount('#app');
