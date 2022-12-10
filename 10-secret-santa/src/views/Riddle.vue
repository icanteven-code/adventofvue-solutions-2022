<script setup>
import { ref, watch } from 'vue'
import Button from '../components/Button.vue'
import { routeOpts } from '../router'

const answer = ref('')
const hasAnsweredCorrectly = ref(false)

watch(answer, newAnswer => {
  if (newAnswer === 'Frost bite') {
    hasAnsweredCorrectly.value = true
  }
})
</script>

<template>
  <div>
    <h1 class="text-4xl text-center mb-6">Hint Number 3</h1>

    <h2 class="text-2xl font-bold text-center mb-2">But First You must Answer a Riddle</h2>

    <p class="mb-4 text-center">What do you get when you cross a snowman and a Vampire?</p>

    <select v-model="answer" class="select select-bordered w-full max-w-xs mx-auto block mb-4">
      <option>A Dad joke</option>
      <option>Frost bite</option>
      <option>Idk bro</option>
    </select>

    <Button v-if="hasAnsweredCorrectly" :url="routeOpts.hint3">Go to next hint</Button>
  </div>
</template>
