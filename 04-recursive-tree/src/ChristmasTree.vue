<script setup lang="ts">
import { ref } from 'vue'
const { size = 1 } = defineProps<{
  size: number
}>()

const rows = ref<number[]>([])

const fillRow = (treeSize: number) => {
  if (treeSize > 0) {
    rows.value.unshift(treeSize)
    fillRow(treeSize - 1)
  }
}

const getColor = () => {
  return Math.random() < 0.3 ? 'bg-red-600 z-10' : 'bg-green'
}

fillRow(size)
</script>

<template>
  <div>
    <div v-for="rowLength in rows" :key="`tree-row-${rowLength}`" class="flex flex-row justify-center">
      <div
        v-for="rowDot in rowLength"
        :key="`tree-row-${rowLength}-${rowDot}`"
        :class="`${getColor()}  relative rounded-full w-16 h-16 -m-2 flex justify-center items-center`"
      />
    </div>
  </div>
</template>
