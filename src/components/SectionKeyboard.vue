<script setup lang="ts">
// ionic + vue
import {
  IonButton,
  IonIcon
} from '@ionic/vue'
import { backspace } from 'ionicons/icons'

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
  guessedLetters,
  partiallyCorrectLetters,
  totallyCorrectLetters
} = storeToRefs(gameStore)

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
        @click="gameStore.updateCurrentGuess(letter)"
      >
        {{ letter }}
      </ion-button>
      <ion-button 
        v-if="index == 3"
        color="almond"
        class="btn-backspace"
        @click="gameStore.updateCurrentGuess('')"
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
        @click="gameStore.submitGuess()"
      >
        Submit
      </ion-button>
    </div>
  </div>
</template>

<style scoped>
.row-keyboard {
  height: 23%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
}

.row-submit {
  height: 31%;
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

/* vertical responsiveness */
@media (max-height: 45rem) {
  .btn-letter, .btn-backspace {
    margin: 0 0.5rem;
    font-size: 0.8rem;
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

/* horizontal responsiveness */
@media (max-width: 35rem) {
  .row-keyboard {
    height: 22%;
  }

  .btn-letter, .btn-backspace {
    font-size: 1.1rem;
  }
  
  .btn-letter {
    margin-right: 1.5rem;
  }
}

@media (max-width: 27.5rem) {
  .row-keyboard {
    height: 21%;
  }

  .btn-letter, .btn-backspace {
    font-size: 1rem;
  }
  
  .btn-letter {
    margin-right: 1.25rem;
  }
}
</style>