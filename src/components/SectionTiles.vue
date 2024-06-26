<script setup lang="ts">
// ionic + vue
import {
  IonCol,
  IonRow
} from '@ionic/vue'
import { computed } from 'vue'

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
 * computed
 * ==================================================================
 */
const answerLetterCounts = computed(() => {
  return getLetterCounts(answer.value)
})

/**
 * methods
 * ==================================================================
 */
function getLetterCounts (word: string) {
  return word.split('').reduce((letterCounts, letter) => {
    if (letter in letterCounts) {
      letterCounts[letter]++
    } else {
      letterCounts[letter] = 1
    }
    return letterCounts
  }, {} as { [key: string]: number })
}

function getTileClass (
  guess: string, 
  letterIndex: number, 
  wordIndex: number
) {
  const currentGuessLetter = guess[letterIndex - 1]

  if (guess && (wordIndex < guessCount.value)) {
    if (answer.value[letterIndex - 1] === currentGuessLetter) {
      return 'success'
    } else if (
      answer.value.includes(currentGuessLetter) &&
      (
        answerLetterCounts.value[currentGuessLetter] >=
        getLetterCounts(guess)[currentGuessLetter]
      )
    ) {
      return 'warning'
    } else { 
      return 'fill'
    }
  }
  
  if (currentGuessLetter) {
    return 'outline'
  }
}
</script>

<template>
  <div>
    <ion-col
      v-for="(guess, wordIndex) in guesses"
      class="ion-no-padding"
      size="12"
    >
      <ion-row class="ion-justify-content-center">
        <div
          v-for="letterIndex in 5"
          :class="`tile row-${wordIndex} ${getTileClass(guess, letterIndex, wordIndex)}`"
        >
          {{ guess[letterIndex - 1] }}
        </div>
      </ion-row>
    </ion-col>
  </div>
</template>

<style scoped>
.tile {
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

/* vertical responsiveness */
@media (max-height: 50rem) {
  .tile {
    height: 3rem;
    width: 3rem;
    font-size: 1.75rem;
  }
}

@media (max-height: 40rem) {
  .tile {
    height: 2.5rem;
    width: 2.5rem;
    margin: 0.15rem;
    font-size: 1.5rem;
  }
}

@media (max-height: 35rem) {
  .tile {
    height: 2.25rem;
    width: 2.25rem;
    border-radius: 0.15rem;
    font-size: 1.25rem;
  }
}

@media (max-height: 30rem) {
  .tile {
    height: 1.75rem;
    width: 1.75rem;
    font-size: 1rem;
  }
}

@media (max-height: 25rem) {
  .tile {
    height: 1.5rem;
    width: 1.5rem;
    margin: 0.1rem;
  }
}

/* horizontal responsiveness */
@media (max-width: 35rem) {
  .tile {
    height: 3.5rem;
    width: 3.5rem;
  }
}

@media (max-width: 27.5rem) {
  .tile {
    height: 3rem;
    width: 3rem;
  }
}
</style>