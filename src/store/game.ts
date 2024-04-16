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
  const guesses = ref<{ [key: number]: string }>({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  })

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
    answer.value = _answer
  }

  function submitGuess () {
    /**
     * @todo
     * check if guess is 5 letters
     * check if guess is a word
     */
    guessCount.value++
  }

  return {
    answer,
    currentGuess,
    generateAnswer,
    guessCount,
    guesses,
    submitGuess
  }
})