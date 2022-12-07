<script setup>
import { selected } from "../composables/itemComparison";
import { products } from "../composables/dataprovider";

const props = defineProps({
  type: String,
});
</script>

<template>
  <select v-model="selected[props.type]" class="p-2 border-2 border-gray-dark">
    <option disabled value="">Select an item</option>
    <option
      v-for="product in products"
      :key="product.id + new Date().getTime()"
      :value="product.id"
    >
      {{ product.title }} - ${{ product.price }}
    </option>
  </select>
</template>
