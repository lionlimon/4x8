import {InjectionKey, Ref} from "vue";

export const hasErrorSymbol = Symbol('hasError') as InjectionKey<Ref<boolean>>;
