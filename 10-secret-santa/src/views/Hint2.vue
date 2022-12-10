<script setup>
import { ref } from 'vue'
import Button from "../components/Button.vue"
import {routeOpts} from "../router"

const hasAnsweredCorrectly = ref(false)
const onSelect = event => {
  if (event.target.id === 'vue') {
    hasAnsweredCorrectly.value = true
  }
}
</script>

<template>
  <div>
    <h1 class="text-4xl text-center mb-6">Hint Number 2</h1>

    <p class="mb-6 text-center">
      Can you guess the correct one? <br />
      My favourite JS framework is:
    </p>

    <form class="flex flex-col gap-2 mb-6" @change="onSelect">
      <div class="flex items-center gap-2">
        <input type="radio" id="vue" name="framework" class="radio" />
        <label for="vue" class="cursor-pointer">Vue</label>
      </div>
      <div class="flex items-center gap-2">
        <input type="radio" id="react" name="framework" class="radio" />
        <label for="react" class="cursor-pointer">React</label>
      </div>
      <div class="flex items-center gap-2">
        <input type="radio" id="astro" name="framework" class="radio" />
        <label for="astro" class="cursor-pointer">Astro</label>
      </div>
    </form>

    <Button v-if="hasAnsweredCorrectly" :url="routeOpts.riddle">Go to next hint</Button>
  </div>
</template>
