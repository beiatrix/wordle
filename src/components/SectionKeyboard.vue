<script setup lang="ts">
// ionic + vue
import {
  IonButton,
  IonCol,
  IonIcon,
  IonRow,
  toastController
} from '@ionic/vue'
import { backspace } from 'ionicons/icons'
import { ref } from 'vue'

// config
import { keyboard } from '@/config/keyboard'

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
  currentGuess,
  guessCount,
  guesses
} = storeToRefs(gameStore)

/**
 * state
 * ==================================================================
 */
const guessedLetters = ref('')
const partiallyCorrectLetters = ref('')
const totallyCorrectLetters = ref('')

/**
 * methods
 * ==================================================================
 */
function getButtonColor (
  letter: string
) {
  if (totallyCorrectLetters.value.includes(letter)) {
    return 'jade'
  } else if (partiallyCorrectLetters.value.includes(letter)) {
    return 'mustard'
  } else if (
    !answer.value.includes(letter) && 
    guessedLetters.value.includes(letter)
  ) {
    return 'taupe-grey'
  } else {
    return 'almond'
  }
}

async function presentToast (message: string) {
  const toast = await toastController.create({
    message,
    position: 'middle',
    duration: 1500, 
    cssClass: 'custom-toast'
  })

  await toast.present()
}

async function lookupWord (word: string) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    )
    const result = await response.json()
    if (Array.isArray(result) && result.length) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

async function submitGuess () {
  if (currentGuess.value?.length < 5) {
    await presentToast('Not enough letters')
    return
  }

  const isWord = await lookupWord(currentGuess.value)
  if (!isWord) {
    await presentToast('Not in word list')
    return 
  }
  
  for (let i = 0; i < 5; i++) {
    const currentLetter = currentGuess.value[i]
    if (
      // totally correct guess
      currentLetter === answer.value[i] && 
      !totallyCorrectLetters.value.includes(currentLetter)
    ) {
      totallyCorrectLetters.value += currentLetter
      partiallyCorrectLetters.value = partiallyCorrectLetters.value.replace(
        currentLetter, ''
      ) 
    } else if (
      // partially correct guess
      answer.value.includes(currentLetter) &&
      !partiallyCorrectLetters.value.includes(currentLetter) &&
      !totallyCorrectLetters.value.includes(currentLetter)
    ) {
      partiallyCorrectLetters.value += currentLetter
    }
  }
  
  guessedLetters.value += currentGuess.value
  guessCount.value++
}

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
        :color="getButtonColor(letter)"
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
        @click="submitGuess()"
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