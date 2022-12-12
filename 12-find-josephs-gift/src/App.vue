<script setup>
import { ref, computed, watch } from 'vue'
const giftsNumber = ref(10)
const currentStep = ref(0)

const eliminationOrder = computed(() => {
  // Create an array of integers from 1 to numGifts.value
  const gifts = [...Array(giftsNumber.value + 1).keys()].slice(1)
  let indexToEliminate = 0
  const moveBy = 1
  const result = []
  while (gifts.length > 1) {
    indexToEliminate = (indexToEliminate + moveBy) % gifts.length
    result.push(gifts[indexToEliminate])
    gifts.splice(indexToEliminate, 1)
  }
  return result
})

const ignoredGifts = computed(() => {
  return currentStep.value > 0
    ? [...eliminationOrder.value].splice(0, currentStep.value)
    : []
})

const onNextStep = () => {
  if (currentStep.value < eliminationOrder.value.length) {
    currentStep.value += 1
  }
}

const onPrevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value -= 1
  }
}

watch(giftsNumber, () => {
  currentStep.value = 0
})
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <section class="text-center mb-3">
      <p>Pick number of presents:</p>
      <div class="flex items-center justify-center">
        <input
          class="cursor-pointer"
          type="range"
          v-model.number="giftsNumber"
          :min="2"
          :max="30"
        />
        <span class="ml-3 font-bold text-green">{{ giftsNumber }}</span>
      </div>
    </section>

    <section class="mb-6 w-[150px] grid grid-cols-4 gap-3 text-2xl">
      <button
        class="transform scale-100 transition-transform duration-300 hover:scale-125"
        @click="currentStep = 0"
      >
        ⏮️
      </button>

      <button
        class="transform scale-100 transition-transform duration-300 hover:scale-125"
        @click="onPrevStep"
      >
        ⬅️
      </button>

      <button
        class="transform scale-100 transition-transform duration-300 hover:scale-125"
        @click="onNextStep"
      >
        ➡️
      </button>

      <button
        class="transform scale-100 transition-transform duration-300 hover:scale-125"
        @click="currentStep = eliminationOrder.length"
      >
        ⏭️
      </button>
    </section>

    <section class="max-w-sm w-full">
      <div class="grid grid-cols-5 gap-2">
        <div
          v-for="gift in giftsNumber"
          :key="gift"
          :class="[
            'border border-gray-dark rounded-md aspect-square flex justify-center items-center',
            ignoredGifts.includes(gift)
              ? 'opacity-40 bg-red-100 cursor-not-allowed'
              : '',
          ]"
        >
          {{ gift }}
        </div>
      </div>
    </section>
  </div>
</template>
