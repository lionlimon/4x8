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
        <v-button size="m"> Кнопка по больше</v-button>
      </div>

      <div class="section-item">
        <v-button loading>Загрузка</v-button>
      </div>

      <div class="section-item">
        <v-button>
          <v-icon name="cart" />
        </v-button>
      </div>

      <div class="section-item">
        <v-button :to="{ query: { hi: 1 } }"> Ссылка в виде кнопки</v-button>
      </div>

      <div class="section-item">
        <v-card>
          <div>
            <strong>Карточка для фона</strong>

            <v-link> Кнопка в виде ссылки</v-link>
          </div>
        </v-card>
      </div>

      <div class="section-item">
        <v-card>
          <div>
            <strong>Карточка для фона</strong>

            <v-link :to="{ query: { hi: 1 } }"> Ссылка в виде ссылки</v-link>
          </div>
        </v-card>
      </div>
    </div>

    <div class="section">
      <h3>Cчётчики</h3>

      <div class="section-item">
        <v-counter />
      </div>

      <div class="section-item">
        <v-counter theme="violet" />
      </div>
    </div>

    <div class="section">
      <h3>Карточка</h3>

      <div class="section-item">
        <v-card>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet beatae doloribus eos ex
          repellendus sit vitae? Accusamus animi assumenda beatae consectetur corporis cupiditate
          eos est eum exercitationem expedita explicabo illo illum laboriosam libero natus, nemo
          nesciunt nostrum placeat porro unde. A consequatur, deserunt. Doloremque dolores eaque
          impedit officia vero.
        </v-card>
      </div>

      <div class="section-item">
        <v-card>
          <template #header>Заголовок</template>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet beatae doloribus eos ex
          repellendus sit vitae? Accusamus animi assumenda beatae consectetur corporis cupiditate
          eos est eum exercitationem expedita explicabo illo illum laboriosam libero natus, nemo
          nesciunt nostrum placeat porro unde. A consequatur, deserunt. Doloremque dolores eaque
          impedit officia vero.

          <v-card-delimiter />
          Разделитель

          <v-card-delimiter />
          Ещё разделитель
        </v-card>
      </div>
    </div>

    <div class="section">
      <h3>Модальное окно</h3>

      <div class="section-item">
        <v-button @click="() => bottomSheet?.open()">Тыкай</v-button>
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
        <v-label>Шелбик</v-label>
      </div>
      <div class="section-item">
        <v-label>
          <v-icon height="14" name="cashback" width="14" />
          Кешбек
        </v-label>
      </div>
    </div>

    <div class="section">
      <h3>Инпуты</h3>

      <div class="section-item">
        <v-range v-model="range" :max="1260" />
      </div>

      <div class="section-item">
        <v-control>
          <v-input v-model="input" label="Имя матери" />
        </v-control>
      </div>

      <div class="section-item">
        <v-control error="Не верно">
          <v-input v-model="input" label="Имя матери" />
        </v-control>
        <br />
      </div>

      <div class="section-item">
        <v-control text="Ты молодец">
          <v-input v-model="input" label="Имя матери" />
        </v-control>
        <br />
      </div>

      <div class="section-item">
        <v-control>
          <v-input v-model="input2" digits label="Введи 3 цифры CVV" mask="###" />
        </v-control>
        <br />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VButton } from '@/components/ui/VButton';
import { VIcon } from '@/components/ui/VIcon';
import { VCounter } from '@/components/ui/VCounter';
import { VCard, VCardDelimiter } from '@ui/v-card/';
import { ref } from 'vue';
import { VModal } from '@ui/VModal/';
import { VLabel } from '@ui/v-lable';
import { VRange } from '@ui/v-range';
import { VInput } from '@ui/v-input';
import { VControl } from '@ui/v-control';
import { VLink } from '@ui/v-link';

const bottomSheet = ref<{open(): void}>()
const range = ref(0);
const input = ref('');
const input2 = ref('');
</script>

<style lang="scss" scoped src="./ui.scss"></style>
