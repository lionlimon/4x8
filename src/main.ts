import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createBottomSheet } from 'bottom-sheet-vue3';
import { router } from './router';
import App from './App.vue';

const modules = import.meta.glob('./assets/icons/*.svg');
Object.values(modules).forEach(async (el) => el());

const app = createApp(App);
const pinia = createPinia();

app.use(createBottomSheet());
app.use(pinia);
app.use(router);
app.mount('#app');
