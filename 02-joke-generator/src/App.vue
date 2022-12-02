<script setup lang="ts">
// fetch('https://v2.jokeapi.dev/joke/christmas') ...

import { onMounted, ref } from 'vue'

interface Joke {
  setup: string
  delivery: string
}
// const isLoading = ref(false)
const joke = ref<Joke | null>(null)
const hasBeenDelivered = ref(false)

const loadJoke = async () => {
  // isLoading.value = true

  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/christmas')
    const { delivery, setup } = await response.json()
    joke.value = { delivery, setup }
  } catch (error) {
    alert('Unexpected error while loading. What a joke!')
    console.error(error)
  }

  hasBeenDelivered.value = false

  // isLoading.value = false
}

onMounted(async () => {
  await loadJoke()
})
</script>

<template>
  <section class="w-full h-full flex justify-center items-center">
    <div class="w-80">
      <!-- <p v-if="isLoading" class="text-3xl text-centertext-green">Loading a joke ...</p> -->

      <template v-if="joke">
        <h1 data-qa="joke-header" class="mb-6">Let me tell you a christmas joke ...</h1>

        <p data-qa="setup" class="px-6 py-2 bg-green rounded-md w-4/5">
          {{ joke.setup }}
        </p>

        <Transition>
          <p data-qa="delivery" v-show="hasBeenDelivered" class="px-6 py-2 bg-orange-400 rounded-md mt-4 w-4/5 ml-auto">
            {{ joke.delivery }}
          </p>
        </Transition>
      </template>

      <button
        v-if="hasBeenDelivered"
        class="mt-10 bg-green text-white px-6 py-1 rounded-md mx-auto block"
        @click="loadJoke"
      >
        Another
      </button>
      <button
        v-else
        class="mt-10 bg-green text-white px-6 py-1 rounded-md mx-auto block"
        @click="hasBeenDelivered = true"
      >
        Tell Me!
      </button>
    </div>
  </section>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
