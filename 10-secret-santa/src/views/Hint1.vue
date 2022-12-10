<script setup>
import { ref } from 'vue'
import Button from "../components/Button.vue"
import {routeOpts} from "../router"

const wasHintSeen = ref(false)
const isModalVisible = ref(false)

const onShowHint = () => {
  isModalVisible.value = !isModalVisible.value

  if (!isModalVisible.value && !wasHintSeen.value) {
    wasHintSeen.value = true
  }
}
</script>

<template>
  <div>
    <h1 class="text-4xl text-center mb-6">Hint Number 1</h1>

    <p class="mb-3">Let's see if this will ring a bell ...</p>

    <button class="ui-btn mb-2" @click="onShowHint">Show hint</button>
    <Button v-if="wasHintSeen" :url="routeOpts.hint2">Go to next hint</Button>

    <input type="checkbox" :checked="isModalVisible" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Do you know me?</h3>
        <p class="py-4">I love frontend and web coding, to make music and to read fantasy books...</p>
        <div class="modal-action">
          <button class="ui-btn" @click="onShowHint">Close hint</button>
        </div>
      </div>
    </div>
  </div>
</template>
