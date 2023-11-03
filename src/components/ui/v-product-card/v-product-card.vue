<template>
  <div class="product-card">
    <div class="product-card__img-wrap">
      <img class="product-card__img" :src="product.imageUrl ?? fallbackImage" alt="" />
      <VLabel v-if="product.cashback" class="product-card__cashback">
        <VIcon width="14" height="14" name="cashback" />
        {{ product.cashback }} %
      </VLabel>
    </div>

    <VCard class="product-card__info">
      <h3 class="product-card__title">
        <span class="product-card__title-inner">
          {{ product.title }}
        </span>
      </h3>
      <p class="product-card__size">{{ product.servingSize }}</p>
      <p v-if="product.label" :class="['product-card__label', labelClasses(product.label.color)]">
        <VIcon :name="product.label.icon" width="18" height="18" />
        {{ product.label.text }}
      </p>

      <div class="product-card__info-bottom">
        <p class="product-card__price">
          {{ formatPrice(product.price) }}
        </p>
        <Transition mode="out-in" name="fade">
          <VButton
            v-if="!isAdded"
            size="s"
            theme="white"
            wide
            @click="emit('add-to-cart')">
            В заказ
            <VIcon name="cart" />
          </VButton>

          <VCounter v-model="count" theme="violet" v-else />
        </Transition>
      </div>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { VCard } from '@ui/v-card';
import type { PropType } from 'vue';
import { VIcon } from 'src/components/ui/VIcon';
import { VButton } from 'src/components/ui/VButton';
import { VCounter } from 'src/components/ui/VCounter';
import { ref, watch } from 'vue';
import { VLabel } from '@ui/v-lable';
import fallbackImage from '@/assets/img/image-fallback.svg';
import { formatPrice } from '@/helpers/formatPrice';

type Emits = {
  (e: 'add-to-cart'): void;
  (e: 'update-count', count: number): void;
};

const emit = defineEmits<Emits>();

const props = defineProps({
  product: {
    type: Object as PropType<CatalogModel>,
    required: true,
  },

  isAdded: {
    type: Boolean,
    default: false,
  },

  currentCount: {
    type: Number,
    default: 0,
  },
});

const count = ref(0);
watch(
  () => count.value,
  (value, oldValue) => {
    if (value !== oldValue) {
      emit('update-count', count.value);
    }
  },
);
watch(
  () => props.currentCount,
  (value) => {
    if (value !== count.value) {
      count.value = value as number;
    }
  },
  { immediate: true },
);

const labelClasses = (color: string) => `c-${color}`;
</script>

<style scoped lang="scss" src="./v-product-card.scss"></style>
