<script setup lang="ts">
// ionic + vue
import {
  IonButton,
  IonCol,
  IonIcon,
  IonRow
} from '@ionic/vue'
import { backspace } from 'ionicons/icons'

// config
import { keyboard } from '@/config/keyboard'

// store
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/store/game'

const gameStore = useGameStore()
const { 
  currentGuess,
  guessCount,
  guesses
} = storeToRefs(gameStore)

function updateCurrentGuess (letter: string) {
  if (!letter) {
    // backspace
    guesses.value[guessCount.value] = currentGuess.value.slice(0, -1)
  } else {
    // stop if > word length limit
    if (currentGuess.value.length === 5) {
      return
    }  
    // add letter
    guesses.value[guessCount.value] = currentGuess.value + letter
  }
}
</script>

<template>
  <ion-row>
    <ion-col
      v-for="(row, index) of keyboard"
      size="12"
    >
      <ion-button 
        v-for="letter in row"
        color="almond"
        class="btn-letter"
        @click="updateCurrentGuess(letter)"
      >
        {{ letter }}
      </ion-button>
      <ion-button 
        v-if="index == 3"
        color="almond"
        class="btn-backspace"
        @click="updateCurrentGuess('')"
      >
        <ion-icon 
          :icon="backspace"
          color="primary"
        />
      </ion-button>
    </ion-col>
    <ion-col
      class="ion-padding"
      size="12"
    >
      <ion-button
        color="success"
        class="submit"
        @click="gameStore.submitGuess()"
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

.btn-letter {
  margin: 0 0.5rem;
  height: 3.5rem;
  width: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ion-color-primary);
}

.btn-backspace {
  margin: 0 0.5rem;
  height: 3.5rem;
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