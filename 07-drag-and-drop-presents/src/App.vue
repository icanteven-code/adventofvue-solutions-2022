<script setup lang="ts">
import ChristmasPresent from './components/ChristmasPresent.vue'
import ChristmasTree from './components/ChristmasTree.vue'
import { ref } from 'vue'

const DROP_KEY = 'presentName'

const presents = ref<string[]>(['small-red-gift', 'blue-gift', 'tall-red-gift'])
const underTheTree = ref<string[]>([])

const onDragStart = (evt: DragEvent, presentName: string) => {
  if (!evt.dataTransfer) return

  evt.dataTransfer.dropEffect = 'move'
  evt.dataTransfer.effectAllowed = 'move'
  evt.dataTransfer.setData(DROP_KEY, presentName)
}

const onDrop = (evt: DragEvent) => {
  if (!evt.dataTransfer) return

  const presentName = evt.dataTransfer.getData(DROP_KEY)
  underTheTree.value.push(presentName)
  presents.value = presents.value.filter(present => present !== presentName)
}
</script>

<template>
  <div class="flex flex-col items-center mt-4 min-h-screen w-full">
    <h1 class="text-xl font-bold">Drag the presents under the tree!</h1>

    <ChristmasTree :presents="underTheTree" class="mt-6" @drop="onDrop" @dragover.prevent @dragenter.prevent />
    <div class="pt-12 mt-16 bg-gray-100 w-full justify-center flex-1">
      <div class="flex items-end justify-center" v-auto-animate>
        <ChristmasPresent
          v-for="present in presents"
          :key="present"
          :name="present"
          :draggable="true"
          @dragstart="onDragStart($event, present)"
        />
      </div>
    </div>
  </div>
</template>
