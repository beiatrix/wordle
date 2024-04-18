<script setup lang="ts">
// ionic + vue
import {
  IonCol,
  IonRow
} from '@ionic/vue'

// store
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/store/game'

/**
 * store
 * ==================================================================
 */
const gameStore = useGameStore()
const { 
  answer,
  guessCount, 
  guesses 
} = storeToRefs(gameStore)

/**
 * methods
 * ==================================================================
 */
function getTileClass (
  guess: string, 
  letterIndex: number, 
  wordIndex: number
) {
  if (guess && (wordIndex < guessCount.value)) {
    if (answer.value[letterIndex - 1] === guess[letterIndex - 1]) {
      return 'success'
    } else if (answer.value.includes(guess[letterIndex - 1])) {
      return 'warning'
    } else { 
      return 'fill'
    }
  }
  if (guess[letterIndex - 1]) {
    return 'outline'
  }
}
</script>

<template>
  <ion-row>
    <ion-col
      v-for="(guess, wordIndex) in guesses"
      class="ion-no-padding"
      size="12"
    >
      <ion-row class="ion-justify-content-center">
        <div
          v-for="letterIndex in 5"
          :class="`box ${getTileClass(guess, letterIndex, wordIndex)}`"
        >
          {{ guess[letterIndex - 1] }}
        </div>
      </ion-row>
    </ion-col>
  </ion-row>
</template>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.75rem;
  width: 3.75rem;
  background-color: rgba(var(--ion-color-taupe-grey-rgb), 0.5);
  border-radius: 0.25rem;
  margin: 0.25rem;
  font-family: 'Karla', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--ion-color-primary-tint);
}

.outline {
  border: 3px solid var(--ion-color-taupe-grey);
}

.fill {
  background-color: var(--ion-color-taupe-grey);
  color: var(--ion-color-light);
}

.success {
  background-color: var(--ion-color-jade);
  color: var(--ion-color-forest);
}

.warning {
  background-color: var(--ion-color-mustard);
  color: var(--ion-color-primary);
}
</style>