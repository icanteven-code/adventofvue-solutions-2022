<script setup>
import NorthPoleDistance from './components/NorthPoleDistance.vue'
</script>

<template>
  <div class="container mx-auto px-4">
    <h2>Example 1</h2>
    <NorthPoleDistance v-slot="{ distace, formatedUnit, toggleUnit }">
      <div>
        <p>You are currently: <b>{{ distace }} {{ formatedUnit }}</b> away from the North Pole.</p>
        <button class="px-6 py-2 rounded-md bg-green text-white" @click="toggleUnit">Toggle unit</button>
      </div>
    </NorthPoleDistance>

    <h2 class="mt-16">Example 2</h2>
    <NorthPoleDistance v-slot="slotProps">
      <section class="border border-gray-600 rounded-md p-6 flex flex-col justify-center items-center">
        <p>Current distance to North Pole is {{ slotProps.distace }} {{ slotProps.formatedUnit }}</p>
        <button class="px-6 py-2 rounded-md bg-red-600 text-white" @click="slotProps.toggleUnit">Change from {{ slotProps.unit }}</button>
      </section>
    </NorthPoleDistance>
  </div>
</template>
