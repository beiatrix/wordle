import { ref } from 'vue'
import { defineStore } from "pinia"
import { generate } from 'random-words'

export const useGameStore = defineStore('game', () => {
  const answer = ref('')

  function generateAnswer () {
    const _answer = generate(
      { minLength: 5, maxLength: 5 }
    ) as string
    answer.value = _answer
  }

  return {
    answer,
    generateAnswer
  }
})