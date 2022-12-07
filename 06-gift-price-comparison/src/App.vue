<script setup>
import ItemSelect from "./components/ItemSelect.vue";
import ComparisonSummary from "./components/ComparisonSummary.vue";
import { loadProducts } from "./composables/dataprovider";

loadProducts();
</script>

<template>
  <div class="w-full h-full flex flex-col gap-5 justify-center items-center">
    <h1 class="text-4xl font-bold">Select items to compare</h1>
    <div class="flex flex-col gap-5 justify-center">
      <ItemSelect type="first" />
      <ItemSelect type="second" />
    </div>
    <ComparisonSummary />
  </div>
</template>
