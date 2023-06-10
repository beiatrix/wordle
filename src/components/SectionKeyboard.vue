<script setup lang="ts">
// ionic + vue
import {
  IonButton,
  IonCol,
  IonRow
} from '@ionic/vue'

// config
import { keyboard } from '@/config/keyboard.js'
</script>

<template>
  <ion-row>
    <ion-col
      v-for="row of keyboard"
      size="12"
    >
      <ion-button 
        v-for="letter in row"
        class="letter"
        color="success"
      >
        {{ letter  }}
      </ion-button>
    </ion-col>
    <ion-col
      class="ion-padding"
      size="12"
    >
      <ion-button
        class="submit"
        color="success"
      >
        SUBMIT
      </ion-button>
    </ion-col>
  </ion-row>
</template>

<style scoped>
ion-button {
  --border-radius: 0.5rem;
  --box-shadow: none;
}

.letter {
  margin: 0.2rem;
  height: 3rem;
  width: 2rem;
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  font-weight: 700;
}

.submit {
  height: 3.5rem;
  font-family: 'Quicksand', sans-serif;
  font-size: 2rem;
  font-weight: 700;
}
</style>