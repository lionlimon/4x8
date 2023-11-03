import { createRouter, createWebHashHistory } from 'vue-router';
import { initHandlers } from './handlers';

const routes = [
  {
    path: '/',
    name: 'home',
    component: async () => (await import('@/pages/home')).Home,
  },
  {
    path: '/training',
    name: 'training',
    component: async () => (await import('@/pages/training')).Training,
  },
];

if (import.meta.env.DEV) {
  routes.push({
    path: '/ui',
    name: 'ui',
    component: async () => (await import('@/pages/ui')).Ui,
  });
}

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.MODE === 'development' ? '' : '4x8'),
  routes,
});

initHandlers(router);
