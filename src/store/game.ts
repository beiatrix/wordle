import { ref } from 'vue'
import { defineStore } from "pinia"

export const useGameStore = defineStore('game', () => {
  const answer = ref('hello')

  return {
    answer
  }
})