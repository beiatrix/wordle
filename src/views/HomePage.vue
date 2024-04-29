<script setup lang="ts">
// ionic + vue
import {
  IonCol,
  IonContent, 
  IonGrid,
  IonPage, 
  IonRow,
  alertController
} from '@ionic/vue'
import { onBeforeUnmount, ref, watch } from 'vue'

// components
import AppBar from '@/components/AppBar.vue'
import ModalInstructions from '@/components/ModalInstructions.vue'
import SectionKeyboard from '@/components/SectionKeyboard.vue'
import SectionTiles from '@/components/SectionTiles.vue'

// store
import { useGameStore } from '@/store/game'
import { storeToRefs } from 'pinia'

/**
 * store
 * ==================================================================
 */
const gameStore = useGameStore()
const { isGameComplete } = storeToRefs(gameStore)

/**
 * state
 * ==================================================================
 */
const isAlertOpen = ref(false)
const isInstructionsModalOpen = ref(true)
const alertTimeout = ref<ReturnType<typeof setTimeout> | undefined>(undefined)

let alert: HTMLIonAlertElement

async function presentAlert () {
  alert = await alertController.create({
    header: 'Play again?',
    backdropDismiss: false,
    buttons: [{
      cssClass: 'alert-button',
      role: 'confirm',
      text: 'OK',
      handler: () => {
        gameStore.resetGame()
        isAlertOpen.value = false
      }
    }],
    cssClass: 'alert',
    mode: 'ios'
  })

  isAlertOpen.value = true
  await alert.present()
}

/**
 * watcher
 * ==================================================================
 */
watch(isGameComplete, async (newVal) => {
  if (newVal) {
    alertTimeout.value = setTimeout(async () => {
      await presentAlert()
    }, 1000)
  }
})

/**
 * setup
 * ==================================================================
 */
// setup winning word
gameStore.generateAnswer()

// keyboard listener
document.addEventListener('keydown', async function (event) {
  if (isInstructionsModalOpen.value || isAlertOpen.value) {
    return
  }
  
  const key = event.key

  // backspace key
  if (key === 'Backspace') {
    gameStore.updateCurrentGuess('')
    return
  }
  // enter key
  if (key === 'Enter') {
    gameStore.submitGuess()
    return
  }
  // key is an alphabet letter (A-Z)
  if (key.length === 1 && /[a-zA-Z]/.test(key)) {
    gameStore.updateCurrentGuess(key.toUpperCase())
    return
  }
})

/**
 * lifecycle hook
 * ==================================================================
*/
onBeforeUnmount(() => {
  clearTimeout(alertTimeout.value)
})
</script>

<template>
  <ion-page>
    <AppBar />

    <ion-content :fullscreen="true" color="dun-tint">
      <ion-grid class="container">
        <ion-row class="ion-justify-content-center row">
          <ion-col
            class="col"
            size="12"
          >
            <ion-row class="section-tiles">
              <SectionTiles />
            </ion-row>
            <ion-row class="section-keyboard">
              <SectionKeyboard />
            </ion-row>
            <ModalInstructions 
              :is-open="isInstructionsModalOpen"
              @close="isInstructionsModalOpen = false"
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.container {
  text-align: center;
  height: calc(100vh - 4rem);
  padding: 0;
}

.row {
  height: 100%;
}

.col {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.section-tiles {
  height: 60%; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-keyboard {
  height: 40%;
}
</style>
