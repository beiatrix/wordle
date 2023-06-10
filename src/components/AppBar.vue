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
    <ion-toolbar>
      <ion-title class="ion-text-center ion-margin">
        Wordle!
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<style scoped>
ion-header {
  border-bottom: 0.1rem solid lightgrey;
}

ion-title {
  font-family: 'Quicksand', sans-serif;
  font-size: 2rem;
  font-weight: 700;
}
</style>