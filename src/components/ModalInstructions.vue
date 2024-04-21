<script setup lang="ts">
// ionic + vue
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonToolbar
} from '@ionic/vue'
import { close } from 'ionicons/icons'
import { ref } from 'vue'

/**
 * state
 * ==================================================================
 */
const modal = ref()

/**
 * methods
 * ==================================================================
 */
function confirm () { 
  modal.value.$el.dismiss(null, 'confirm')
}

function getTileClass (letter: string) {
  console.log('letter', letter)
  switch (letter) {
    case 'A': 
      return 'success'
    case 'U': 
      return 'warning'
    case 'G':
      return 'fill'
  }
}
</script>

<template>
  <ion-modal
    :is-open="true"
    mode="ios"
    ref="modal"
  >
    <ion-header class="ion-padding">
      <ion-toolbar 
        color="transparent" 
        class="ion-no-border"
      >
        <div class="title">How to Play</div>
        <ion-buttons slot="end">
          <ion-button 
            size="small" 
            @click="confirm"
          >
            <ion-icon 
              slot="icon-only" 
              color="forest" 
              :icon="close" 
            />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2 class="ion-padding-horizontal">
        You get 6 chances to guess the Wordle.
      </h2>
      <ion-item lines="none">
        Your guesses must be valid 5-letter words.
      </ion-item>
      <ion-item lines="none">
        The tile colors will change to indicate how close your guess is to the answer.
      </ion-item>
      <ion-item lines="none">
        <b>Examples:</b>
      </ion-item>
      <ion-item lines="none">
        <ion-label>
          <div class="box-container">
            <div
              v-for="letter in 'DANCE'.split('')"
              :class="`box ${getTileClass(letter)}`"
            >
              {{ letter }}
            </div>
          </div>
          <p>
            <b>A</b> is in the word and in the right space.
          </p>
        </ion-label>
      </ion-item>
      <ion-item lines="none">
        <ion-label>
          <div class="box-container">
            <div
              v-for="letter in 'CLOUD'.split('')"
              :class="`box ${getTileClass(letter)}`"
            >
              {{ letter }}
            </div>
          </div>
          <p>
            <b>U</b> is in the word but in the wrong space.
          </p>
        </ion-label>
      </ion-item>
      <ion-item lines="none">
        <ion-label>
          <div class="box-container">
            <div
              v-for="letter in 'TIGER'.split('')"
              :class="`box ${getTileClass(letter)}`"
            >
              {{ letter }}
            </div>
          </div>
          <p>
            <b>G</b> is not in the word at all.
          </p>
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
ion-modal {
  --background: var(--ion-color-platinum-shade);
}

ion-toolbar {
  --border-color: var(--ion-color-platinum-shade);
}

ion-content, ion-item {
  --background: var(--ion-color-platinum-tint);
  --color: var(--ion-color-forest);
  font-family: 'Karla', sans-serif;
}

.title {
  color: var(--ion-color-forest);
  font-family: 'Karla', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
}

p {
  color: var(--ion-color-hunter);
  font-family: 'Karla', sans-serif;
}

.box-container {
  width: 100%;
  display: flex;
  margin-bottom: 0.5rem;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  background-color: rgba(var(--ion-color-taupe-grey-rgb), 0.5);
  border: 3px solid var(--ion-color-taupe-grey);
  border-radius: 0.25rem;
  margin: 0.25rem 0.5rem 0.25rem 0;
  font-family: 'Karla', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ion-color-primary-tint);
}

.fill {
  background-color: var(--ion-color-taupe-grey);
  color: var(--ion-color-light);
}

.success {
  background-color: var(--ion-color-jade);
  border: none;
  color: var(--ion-color-forest);
}

.warning {
  background-color: var(--ion-color-mustard);
  border: none;
  color: var(--ion-color-primary);
}
</style>