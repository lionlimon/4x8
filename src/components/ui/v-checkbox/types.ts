export interface ICheckboxProps {
  modelValue?: any;
  value?: string | object;
  disabled?: boolean;
  trueValue?: boolean;
  falseValue?: boolean;
}

export interface ICheckboxEmits {
  (e: 'update:modelValue', value: string | object): void;
}
