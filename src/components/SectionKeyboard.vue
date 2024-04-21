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
import { onBeforeUnmount, ref } from 'vue'

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
  guessedLetters,
  guesses,
  isGameComplete,
  partiallyCorrectLetters,
  totallyCorrectLetters
} = storeToRefs(gameStore)

/**
 * state
 * ==================================================================
 */
const timeout = ref<ReturnType<typeof setTimeout> | undefined>(undefined)

/**
 * methods
 * ==================================================================
 */
function getButtonClass (
  letter: string
) {
  if (totallyCorrectLetters.value.includes(letter)) {
    return 'success'
  } else if (partiallyCorrectLetters.value.includes(letter)) {
    return 'warning'
  } else if (
    !answer.value.includes(letter) && 
    guessedLetters.value.includes(letter)
  ) {
    return 'fill'
  } else {
    return 'default'
  }
}

async function presentToast (
  message: string,
  type: 'default' | 'error' | 'success' = 'default'
) {
  const toast = await toastController.create({
    message,
    position: 'middle',
    duration: 800, 
    cssClass: `${type}-toast`
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
  // check if not enough letters
  if (currentGuess.value?.length < 5) {
    await presentToast('Not enough letters', 'error')
    return
  }

  // check if not a real word
  const isWord = await lookupWord(currentGuess.value)
  if (!isWord) {
    await presentToast('Not in word list', 'error')
    return 
  }
  
  // check correctness of guess
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

  // game over - lose
  if (guessCount.value === 5 && (
    currentGuess.value !== answer.value
  )) {
    await presentToast(answer.value)
    isGameComplete.value = true
    return 
  }
  
  // game over - win
  if (currentGuess.value === answer.value) {
    timeout.value = setTimeout(async () => {
      await presentToast('You won!', 'success')
      isGameComplete.value = true
    }, 300)
  }

  // continue game
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

/**
 * lifecycle hook
 * ==================================================================
*/
onBeforeUnmount(() => {
  clearTimeout(timeout.value)
})
</script>

<template>
  <div style="height: 100%;">
    <div
      v-for="(row, index) of keyboard"
      class="row-keyboard"
      size="12"
    >
      <ion-button 
        v-for="letter in row"
        :class="`btn-letter ${getButtonClass(letter)}`"
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
    </div>
    <div size="12" class="row-submit">
      <ion-button
        color="success"
        class="btn-submit"
        @click="submitGuess()"
      >
        Submit
      </ion-button>
    </div>
  </div>
</template>

<style scoped>
.row-keyboard {
  height: 24%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
}

.row-submit {
  height: 28%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
ion-button {
  --border-radius: 0.25rem;
  --box-shadow: none;
}

ion-button.fill {
  --background: var(--ion-color-taupe-grey);
  color: var(--ion-color-light);
}

ion-button.success {
  --background: var(--ion-color-jade);
  color: var(--ion-color-forest);
}

ion-button.warning {
  --background: var(--ion-color-mustard);
  color: var(--ion-color-primary);
}

ion-button.default {
  --background: var(--ion-color-almond);
}

.btn-letter {
  margin-right: 2rem;
  height: 100%;
  width: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ion-color-primary);
}

.btn-backspace {
  height: 100%;
}

.btn-submit {
  height: 80%;
  font-family: 'Karla', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--ion-color-forest);
}

@media (max-height: 45rem) {
  .btn-letter, .btn-backspace {
    margin: 0 0.5rem;
    font-size: 0.8rem;
  }

  .btn-letter {
    width: 1rem;
  }

  .btn-submit {
    font-size: 1rem;
  }
}

@media (max-height: 32.5rem) {
  .btn-letter, .btn-backspace {
    margin: 0 0.5rem;
    font-size: 0.75rem;
  }

  .btn-letter {
    width: 0.75rem;
  }

  .btn-submit {
    font-size: 0.85rem;
  }
}

</style>