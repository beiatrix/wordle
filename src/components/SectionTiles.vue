<script setup lang="ts">
// ionic + vue
import {
  IonCol,
  IonRow
} from '@ionic/vue'
</script>

<template>
  <ion-row>
    <ion-col
      v-for="_i in 6"
      class="ion-no-padding"
      size="12"
    >
      <ion-row class="ion-justify-content-center">
        <div
          v-for="_j in 5"
          class="box"
        >
           
        </div>
      </ion-row>
    </ion-col>
  </ion-row>
</template>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.75rem;
  width: 3.75rem;
  background-color: rgba(var(--ion-color-taupe-grey-rgb), 0.5);
  border-radius: 0.25rem;
  margin: 0.25rem;
  font-family: 'Karla', sans-serif;
  font-size: 2rem;
  font-weight: 700;
}
</style>