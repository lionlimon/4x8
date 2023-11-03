<template>
  <div class="ui container">
    <div class="section">
      <h3>Кнопки и ссылки</h3>

      <div class="section-item">
        <VButton>Обычная кнопка</VButton>
      </div>

      <div class="section-item">
        <VButton variant="outline">Outline</VButton>
      </div>

      <div class="section-item">
        <VButton size="m"> Кнопка по больше</VButton>
      </div>

      <div class="section-item">
        <VButton loading>Загрузка</VButton>
      </div>

      <div class="section-item">
        <VButton>
          <VIcon name="cart" />
        </VButton>
      </div>

      <div class="section-item">
        <VButton :to="{ query: { hi: 1 } }"> Ссылка в виде кнопки</VButton>
      </div>

      <div class="section-item">
        <VCard>
          <div>
            <strong>Карточка для фона</strong>

            <VLink> Кнопка в виде ссылки</VLink>
          </div>
        </VCard>
      </div>

      <div class="section-item">
        <VCard>
          <div>
            <strong>Карточка для фона</strong>

            <VLink :to="{ query: { hi: 1 } }"> Ссылка в виде ссылки</VLink>
          </div>
        </VCard>
      </div>
    </div>

    <div class="section">
      <h3>Cчётчики</h3>

      <div class="section-item">
        <VCounter />
      </div>

      <div class="section-item">
        <VCounter theme="violet" />
      </div>
    </div>

    <div class="section">
      <h3>Карточка</h3>

      <div class="section-item">
        <VCard>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet beatae doloribus eos ex
          repellendus sit vitae? Accusamus animi assumenda beatae consectetur corporis cupiditate
          eos est eum exercitationem expedita explicabo illo illum laboriosam libero natus, nemo
          nesciunt nostrum placeat porro unde. A consequatur, deserunt. Doloremque dolores eaque
          impedit officia vero.
        </VCard>
      </div>

      <div class="section-item">
        <VCard>
          <template #header>Заголовок</template>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet beatae doloribus eos ex
          repellendus sit vitae? Accusamus animi assumenda beatae consectetur corporis cupiditate
          eos est eum exercitationem expedita explicabo illo illum laboriosam libero natus, nemo
          nesciunt nostrum placeat porro unde. A consequatur, deserunt. Doloremque dolores eaque
          impedit officia vero.

          <VCardDelimiter />
          Разделитель

          <VCardDelimiter />
          Ещё разделитель
        </VCard>
      </div>
    </div>

    <div class="section">
      <h3>Модальное окно</h3>

      <div class="section-item">
        <VButton @click="() => bottomSheet?.open()">Тыкай</VButton>
      </div>

      <VModal ref="bottomSheet" title="Ушлёпок">
        <img
          alt=""
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-v_vqwnHQJ7XkGgaCiAlzf5ZDdLsl5rdB2w&usqp=CAU"
          style="width: 300px; height: 100%; display: block; margin: auto"
        />
      </VModal>
    </div>

    <div class="section">
      <h3>Шэлбики</h3>

      <div class="section-item">
        <VLabel>Шелбик</VLabel>
      </div>
      <div class="section-item">
        <VLabel>
          <VIcon height="14" name="cashback" width="14" />
          Кешбек
        </VLabel>
      </div>
    </div>

    <div class="section">
      <h3>Инпуты</h3>

      <div class="section-item">
        <VRange v-model="range" :max="1260" />
      </div>

      <div class="section-item">
        <VControl>
          <VInput v-model="input" label="Имя матери" />
        </VControl>
      </div>

      <div class="section-item">
        <VControl error="Не верно">
          <VInput v-model="input" label="Имя матери" />
        </VControl>
        <br />
      </div>

      <div class="section-item">
        <VControl text="Ты молодец">
          <VInput v-model="input" label="Имя матери" />
        </VControl>
        <br />
      </div>

      <div class="section-item">
        <VControl>
          <VInput
            v-model="input2"
            digits
            label="Введи 3 цифры CVV"
            mask="###" />
        </VControl>
        <br />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VCard, VCardDelimiter } from '@ui/v-card/';
import { ref } from 'vue';
import { VModal } from '@ui/VModal/';
import { VLabel } from '@ui/v-lable';
import { VRange } from '@ui/v-range';
import { VInput } from '@ui/v-input';
import { VControl } from '@ui/v-control';
import { VLink } from '@ui/v-link';
import { VCounter } from '@/components/ui/VCounter';
import { VIcon } from '@/components/ui/VIcon';
import { VButton } from '@/components/ui/VButton';

const bottomSheet = ref<{ open(): void }>();
const range = ref(0);
const input = ref('');
const input2 = ref('');
</script>

<style lang="scss" scoped src="./ui.scss"></style>
