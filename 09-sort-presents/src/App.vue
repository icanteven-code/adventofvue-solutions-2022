<script setup>
import { ref, computed } from 'vue'
import presentsData from './presents.json'

const sortOpts = {
  asc: 'ASC',
  desc: 'DESC',
}

const isSortingEnabled = ref(false)
const sortDirection = ref(sortOpts.asc)

const getSortedPresents = () => {
  return [...presentsData].sort((first, second) => {
    const sizeFirst = first.dimensions.height * first.dimensions.width
    const sizeSecond = second.dimensions.height * second.dimensions.width

    return sortDirection.value === sortOpts.asc ? sizeFirst - sizeSecond : sizeSecond - sizeFirst;
  })
}

const onSortChange = () => {
  sortDirection.value = sortDirection.value === sortOpts.asc ? sortOpts.desc : sortOpts.asc
}

const presents = computed(() => {
  return isSortingEnabled.value ? getSortedPresents() : presentsData
})

const handleSorting = () => {
  isSortingEnabled.value = !isSortingEnabled.value
}
</script>

<template>
  <div class="w-full h-full p-4 flex justify-center items-center">
    <div class="max-w-md">
      <div>
        <img src="/assets/tree.svg" alt="Christmas tree" />
      </div>
      <div class="mt-2 flex justify-center items-center">
        <img
          v-for="present in presents"
          :key="present.id"
          :src="present.src"
          :alt="`Present ${present.id}`"
          data-qa="present"
        />
      </div>

      <div class="flex justify-center gap-4 mt-12">
        <button class="bg-green text-black py-2 px-6 rounded-md" @click="handleSorting">Toggle sort</button>
        <button class="bg-green text-black py-2 px-6 rounded-md" @click="onSortChange">
          Change sorting: {{ sortDirection }}
        </button>
      </div>

      <div class="mt-4 text-center flex justify-center">
        <p class="mr-1">Sorting is</p>
        <p class="overflow-hidden w-[88px] flex">
          <Transition>
            <span v-if="isSortingEnabled" class="block transform w-[88px] whitespace-nowrap">enabled 🟢</span>
            <span v-else class="block w-[88px] whitespace-nowrap">disabled ⚫</span>
          </Transition>
        </p>
      </div>
    </div>
  </div>
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
