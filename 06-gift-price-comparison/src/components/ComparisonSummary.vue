<script setup>
import { useItemComparison } from "../composables/itemComparison";
const { pricyProduct, cheapProduct, quantityDiff, areProductsSame } =
  useItemComparison();
</script>

<template>
  <Transition>
    <p v-if="areProductsSame" class="mx-5 text-center">
      <em>These are the same items</em>
    </p>
    <p v-else class="mx-5 text-center">
      You can get
      <strong class="text-green mr-1 text-lg">{{ quantityDiff || "N" }}</strong>
      <em class="text-lg px-1">{{ cheapProduct?.title || "X items" }}</em> for
      about the same price as a single
      <em class="text-lg px-1">{{ pricyProduct?.title || "Y items" }}</em>
    </p>
  </Transition>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
