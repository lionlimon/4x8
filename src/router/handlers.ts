import { Router } from 'vue-router';

export const initHandlers = (router: Router) => {
  router.afterEach((to, from) => {
    if (!from.name) {
      to.meta.isFirstPage = true;
    }
  });
};
