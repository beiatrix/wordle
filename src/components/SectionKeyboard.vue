<script setup lang="ts">
// ionic + vue
import {
  IonButton,
  IonCol,
  IonRow
} from '@ionic/vue'

// config
import { keyboard } from '@/config/keyboard'
</script>

<template>
  <ion-row>
    <ion-col
      v-for="row of keyboard"
      size="12"
    >
      <ion-button 
        v-for="letter in row"
        color="almond"
        class="letter"
      >
        {{ letter }}
      </ion-button>
    </ion-col>
    <ion-col
      class="ion-padding"
      size="12"
    >
      <ion-button
        color="success"
        class="submit"
      >
        Submit
      </ion-button>
    </ion-col>
  </ion-row>
</template>

<style scoped>
ion-button {
  --border-radius: 0.25rem;
  --box-shadow: none;
}

.letter {
  margin: 0 0.5rem;
  height: 3.5rem;
  width: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ion-color-primary);
}

.submit {
  height: 3.5rem;
  font-family: 'Karla', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--ion-color-forest);
}
</style>