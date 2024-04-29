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
ion-toolbar {
  --min-height: 4rem;
}

ion-title {
  font-family: 'Karla', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--ion-color-forest);
}

@media (max-height: 35rem) {
  ion-title {
    font-size: 1.5rem;
  }

  ion-toolbar {
    --min-height: 3rem;
  }
}
</style>