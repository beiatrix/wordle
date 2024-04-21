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
const { 
  answer,
  isGameComplete
} = storeToRefs(gameStore)

/**
 * setup
 * ==================================================================
 */
gameStore.generateAnswer()

/**
 * state
 * ==================================================================
 */
const timeout = ref<ReturnType<typeof setTimeout> | undefined>(undefined)

async function presentAlert () {
  const alert = await alertController.create({
    header: 'Play again?',
    backdropDismiss: false,
    buttons: [{
      cssClass: 'alert-button',
      role: 'confirm',
      text: 'OK',
      handler: () => {
        gameStore.resetGame()
      }
    }],
    cssClass: 'alert',
    mode: 'ios'
  })

  await alert.present()
}

/**
 * watcher
 * ==================================================================
 */
watch(isGameComplete, async (newVal) => {
  if (newVal) {
    timeout.value = setTimeout(async () => {
      await presentAlert()
    }, 1000)
  }
})


/**
 * @todo delete
 */
watch(
  answer, 
  (newVal) => {
    console.log('answer:', newVal)
  },
  { 
    immediate: true
  }
)

/**
 * lifecycle hook
 * ==================================================================
*/
onBeforeUnmount(() => {
  clearTimeout(timeout.value)
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
            <div class="section-tiles">
              <SectionTiles />
            </div>
            <div class="section-keyboard">
              <SectionKeyboard />
            </div>
            <ModalInstructions />
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
