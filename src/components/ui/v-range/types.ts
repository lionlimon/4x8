export interface IRangeProps {
  min?: number;
  max?: number;
  modelValue?: number | string;
}

export interface IRangeEmits {
  (e: 'update:modelValue', value: string): void;
}
