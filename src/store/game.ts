// ionic + vue
import { toastController } from '@ionic/vue'
import { computed, onBeforeUnmount, ref } from 'vue'

// utilities
import { generate } from 'random-words'

// pinia
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  /**
   * state
   * ==================================================================
   */
  const answer = ref('')
  const guessCount = ref(0)
  const guessedLetters = ref('')
  const guesses = ref<{ [key: number]: string }>({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  })
  const isGameComplete = ref(false)
  const partiallyCorrectLetters = ref('')
  const toastTimeout = ref<ReturnType<typeof setTimeout> | undefined>(undefined)
  const totallyCorrectLetters = ref('')

  /**
   * getters
   * ==================================================================
   */
  const currentGuess = computed(() => {
    return guesses.value[guessCount.value]
  })

  /**
   * actions
   * ==================================================================
  */
  function generateAnswer () {
    const _answer = generate(
      { minLength: 5, maxLength: 5 }
    ) as string
    answer.value = _answer.toUpperCase()
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

  function resetGame () {
    answer.value = ''
    guessCount.value = 0
    guessedLetters.value = ''
    guesses.value = {
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: ''
    }
    isGameComplete.value = false
    partiallyCorrectLetters.value = ''
    totallyCorrectLetters.value = ''

    generateAnswer()
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
      toastTimeout.value = setTimeout(async () => {
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
    clearTimeout(toastTimeout.value)
  })

  return {
    answer,
    currentGuess,
    generateAnswer,
    guessCount,
    guessedLetters,
    guesses,
    isGameComplete,
    partiallyCorrectLetters,
    resetGame,
    submitGuess,
    totallyCorrectLetters,
    updateCurrentGuess
  }
})