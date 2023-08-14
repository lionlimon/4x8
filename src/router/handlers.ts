import { Router } from 'vue-router';

export const initHandlers = (router: Router) => {
  router.afterEach((to, from) => {
    if (!from.name) {
      to.meta.isFirstPage = true;
    }

    const toDepth = to.path.split('/').filter(Boolean).length;
    const fromDepth = from.path.split('/').filter(Boolean).length;

    to.meta.transition = toDepth > fromDepth ? 'slide-left' : 'slide-right';
  });
};
