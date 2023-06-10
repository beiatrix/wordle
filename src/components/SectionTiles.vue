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
          A
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
  border: 0.2rem solid lightgrey;
  border-radius: 0.5rem;
  margin: 0.25rem;
  font-family: 'Quicksand', sans-serif;
  font-size: 2rem;
  font-weight: 700;
}
</style>