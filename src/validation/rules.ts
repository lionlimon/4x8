import { helpers, required as VRequried, email as VEmail } from '@vuelidate/validators'
import {phoneCheck} from "./validations";

const { withMessage } = helpers;
export const required = withMessage(
  'Поле обязательно для заполнения', VRequried
)

export const requiredCheck = withMessage(
  'Согласие обязательно', (value: boolean) => value
)

export const phone = withMessage(
  'Не верный формат телефона', phoneCheck
)

export const email = withMessage(
  'Не верный формат email', VEmail
)
