import { useReCaptcha } from 'vue-recaptcha-v3';

export const useRecaptchaToken = () => {
  const recaptchaInstance = useReCaptcha();
  const getToken = async () => {
    await recaptchaInstance?.recaptchaLoaded();

    return recaptchaInstance?.executeRecaptcha('yourActionHere');
  };

  return getToken;
};
