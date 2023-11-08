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
        <VCounter v-model="counter" />
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
        <VMiniInput v-model="input" />
      </div>

      <div class="section-item">
        <VSwitch v-model="switcher">Переключатель</VSwitch>
      </div>

      <div class="section-item">
        <VSelect v-model="select" :options="options">Cписок</VSelect>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { VModal } from '@ui/VModal/';
import { VCounter } from '@/components/ui/VCounter';
import { VIcon } from '@/components/ui/VIcon';
import { VButton } from '@/components/ui/VButton';
import { VMiniInput } from '@ui/VMiniInput';
import { VSwitch } from '@ui/VSwitch';
import { VSelect } from '@ui/VSelect';

const bottomSheet = ref<{ open(): void }>();
const input = ref('');
const select = ref('');
const counter = ref('0');
const options = [
  { title: 'Option 1', value: 'op-1' },
  { title: 'Option 2', value: 'op-2' },
  { title: 'Option 3', value: 'op-3' },
];
const switcher = ref(false);
</script>

<style lang="scss" scoped src="./ui.scss"></style>
