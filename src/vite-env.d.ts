/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}

declare module '*.scss';
declare module '*.png';

interface ImportMetaEnv {
  VITE_APP_HOST_URL: string;
  VITE_APP_API_PREFIX: string;
  VITE_APP_API_URL: string;
  VITE_APP_STORAGE_URL: string;
  VITE_APP_RECAPTCHA_SITE_KEY: string;
}

export {};
