import { ServerErrors, useVuelidate, Validation } from '@vuelidate/core';
import {
  computed, isRef, Ref, ref,
} from 'vue';
import { getObjectValue } from '@/helpers/getObjectValue';

export const useValidation = <
  R extends Record<string, unknown> | Ref<unknown>,
  F extends Partial<Record<keyof R, unknown> | Ref<Record<keyof R, unknown>>>,
>(rules: R, form: F) => {
  const formFields = Object.keys(form);
  const serverErrors = ref({} as ServerErrors);

  const setInitialServerErrors = () => {
    formFields.forEach((key) => (
      serverErrors.value[key as keyof ServerErrors] = []
    ));
  };

  setInitialServerErrors();

  const syncServerErrors = (
    errors: Partial<Record<keyof F, string[]>>,
  ) => serverErrors.value = errors as ServerErrors;

  const validation = useVuelidate(rules, form, { $externalResults: serverErrors });

  const getError = computed(
    () => (key: keyof F) => {
      const mayBeError = validation.value[key as string]?.$errors?.[0]?.$message;
      return (isRef(mayBeError) ? mayBeError.value : mayBeError) ?? '';
    },
  );

  const touch = (key: keyof F) => {
    getObjectValue(validation.value, key as keyof Validation)?.$touch?.();
  };

  return {
    serverErrors, getError, validation, setInitialServerErrors, syncServerErrors, touch,
  };
};
