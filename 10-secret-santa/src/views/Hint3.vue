<script setup>
import { ref, watch } from 'vue'
import Button from '../components/Button.vue'
import { routeOpts } from '../router'
const answer = ref('')
const hasAnsweredCorrectly = ref(false)

watch(answer, newAnswer => {
  hasAnsweredCorrectly.value = newAnswer.toLowerCase() === 'simeon'
})
</script>

<template>
  <div>
    <h1 class="text-4xl text-center mb-6">Hint Number 2</h1>

    <p class="mb-2 text-center">
      Another big hobby of mine is making music. <br />
      More precisely on my guitar 🎸.
    </p>

    <p class="text-2xl text-center font-bold mb-4">Do you know who I am?</p>

    <input v-model="answer" type="text" placeholder="Type here" class="input w-full max-w-xs block mx-auto mb-6" />

    <template v-if="hasAnsweredCorrectly">
      <div
        class="max-w-lg mx-auto border-2 border-green py-3 px-6 text-center bg-gray-200 text-gray-dark rounded-lg mb-4"
      >
        Congrats! You've managed to find out who I am, that's so cool.
      </div>

      <Button :url="routeOpts.start">Go again</Button>
    </template>
  </div>
</template>
