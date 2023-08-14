import { createRouter, createWebHistory } from 'vue-router';
import { initHandlers } from './handlers';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: async () => (await import('@/pages/home')).Home
    },
    {
      path: '/training',
      name: 'training',
      component: async () => (await import('@/pages/training')).Training
    },

    {
      path: '/ui',
      name: 'ui',
      component: async () => (await import('@/pages/ui')).Ui
    },
  ]
});

initHandlers(router);
export default router;
