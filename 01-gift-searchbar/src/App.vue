<script setup>
import { ref, watch } from 'vue'
import debounce from 'lodash.debounce'

const isLoading = ref(false)
const hasNotFoundProducts = ref(false)
const searchTerm = ref('')
const foundProducts = ref([])

const findProducts = async newTearm => {
  isLoading.value = true
  hasNotFoundProducts.value = false

  if (!newTearm) {
    foundProducts.value = []
    isLoading.value = false
    return
  }

  try {
    const prodResponse = await fetch(`https://dummyjson.com/products/search?q=${newTearm}&limit=10`)
    const { products } = await prodResponse.json()
    foundProducts.value = products

    if (products.length === 0) {
      hasNotFoundProducts.value = true
    }
  } catch (error) {
    alert('Unexpected error while loading products')
  }
  isLoading.value = false
}

watch(
  searchTerm,
  debounce(newTerm => findProducts(newTerm))
)
</script>

<template>
  <div class="w-full h-full flex flex-col gap-5 justify-center items-center">
    <h1 class="text-4xl font-bold">Gift Search Bar</h1>
    <input type="text" class="p-2 border-2 border-gray-dark" v-model="searchTerm" placeholder="Start typing..." />

    <p v-if="isLoading" class="text-green text-center text-xl">Loading ...</p>
    <ul v-else class="list-disc">
      <li v-for="product in foundProducts" :key="product.id">
        {{ product.title }}
      </li>
    </ul>

    <p v-if="hasNotFoundProducts && !isLoading" class="px-6 py-1 bg-red-400 text-gray-dark rounded-full">
      No products found!
    </p>
  </div>
</template>
