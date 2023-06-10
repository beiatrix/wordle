<script setup lang="ts">
// ionic + vue
import {
  IonCol,
  IonContent, 
  IonGrid,
  IonPage, 
  IonRow
} from '@ionic/vue'

// components
import AppBar from '@/components/AppBar.vue'
import SectionKeyboard from '@/components/SectionKeyboard.vue'
import SectionTiles from '@/components/SectionTiles.vue'
</script>

<template>
  <ion-page>
    <AppBar />

    <ion-content :fullscreen="true">
      <ion-grid class="container">
        <ion-row class="ion-justify-content-center row">
          <ion-col
            class="col"
            size="12"
            size-sm="10"
            size-md="9"
            size-lg="8"
            size-xl="6"
          >
            <SectionTiles />
            <SectionKeyboard />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.container {
  text-align: center;
  height: 100%;
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
</style>
