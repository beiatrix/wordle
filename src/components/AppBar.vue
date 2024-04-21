<script setup lang="ts">
// ionic + vue
import {  
  IonHeader, 
  IonTitle, 
  IonToolbar 
} from '@ionic/vue'
</script>

<template>
  <ion-header
    class="ion-no-border"
    :translucent="true"
  >
    <ion-toolbar color="hunter">
      <ion-title class="ion-text-center">
        Wordle
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<style scoped>
ion-title {
  font-family: 'Karla', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--ion-color-forest);
  margin: 1rem;
}

@media (max-height: 45rem) {
  ion-title {
    margin: 0.5rem;
  }
}

@media (max-height: 35rem) {
  ion-title {
    font-size: 1.5rem;
    margin: 0;
    margin-top: -0.5rem;
  }

  ion-toolbar {
    height: 3rem;
  }
}
</style>