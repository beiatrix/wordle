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
    class="ion-no-border ion-margin-bottom"
    :translucent="true"
  >
    <ion-toolbar color="hunter">
      <ion-title class="ion-text-center ion-margin">
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
}
</style>