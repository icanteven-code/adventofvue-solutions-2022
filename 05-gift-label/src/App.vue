<script setup>
import { ref } from 'vue'

// Option 1
// const fieldTo = ref('')
// const fieldFrom = ref('')
// const handleInputTo = event => {
//   fieldTo.value = event.target.value
// }

// const handleInputFrom = event => {
//   fieldFrom.value = event.target.value
// }

// Option 2
// const formData = ref({
//   to: '',
//   from: '',
// })
// const handleInput = (event, field) => {
//   formData.value[field] = event.target.value
// }

// Option 3 2-way data binding
const fieldTo = ref('')
const fieldFrom = ref('')

</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <div>
      <div class="mb-3 w-full max-w-2xl p-4 rounded bg-red-400 text-white">
        <div class="border-2 rounded flex flex-col md:flex-row md:items-center md:gap-8 p-4">
          <img src="/assets/santa.svg" alt="" class="max-w-[12em]" />
          <div>
            <h1 class="font-serif text-4xl">Happy Holidays!</h1>
            <!-- Option 1 -->
            <!-- <div class="mt-4 bg-white text-black p-2 rounded">TO: {{ fieldTo }}</div>
            <div class="mt-2 bg-white text-black p-2 rounded">FROM: {{ fieldFrom }}</div> -->

            <!-- Option 2 -->
            <!-- <div class="mt-4 bg-white text-black p-2 rounded">TO: {{ formData.to }}</div>
            <div class="mt-2 bg-white text-black p-2 rounded">FROM: {{ formData.from }}</div> -->

            <!-- Option 3 -->
            <div class="mt-4 bg-white text-black p-2 rounded">TO: {{ fieldTo }}</div>
            <div class="mt-2 bg-white text-black p-2 rounded">FROM: {{ fieldFrom }}</div>
          </div>
        </div>
      </div>

      <form action="">
        <div class="mb-2">
          <label for="fieldTo" class="mr-2">To:</label>
          <input
            id="fieldTo"
            class="border border-gray-dark px-2 py-1 rounded-md"
            type="string"
            v-model="fieldTo"
          />
        </div>
        
        <div>
          <label for="fieldFrom" class="mr-2">From:</label>
          <input
            id="fieldFrom"
            class="border border-gray-dark px-2 py-1 rounded-md"
            type="string"
            v-model="fieldFrom"
          />
        </div>
      </form>
    </div>
  </div>
</template>
