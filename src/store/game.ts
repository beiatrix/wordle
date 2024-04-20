import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { generate } from 'random-words'

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
    totallyCorrectLetters
  }
})