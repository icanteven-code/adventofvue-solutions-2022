<script setup>
import { ref } from 'vue'
import ChristmasTree from './ChristmasTree.vue'
import ChristmasLights from './ChristmasLights.vue'
import ChristmasOrnament from './ChristmasOrnament.vue'
import RandomOrnament from './RandomOrnament.vue'

const options = {
  red: 'red',
  redGreen: 'redGreen',
  redDiagonal: 'redDiagonal',
  random: 'random',
}

const activeType = ref(options.red)
</script>

<template>
  <div class="px-12 py-6 flex justify-center items-center gap-4 flex-wrap">
    <button
      :class="[
        activeType === options.red ? 'bg-orange-300' : 'bg-green',
        'border-2 border-green  px-6 py-2 rounded-lg',
      ]"
      @click="activeType = options.red"
    >
      Show 🔴 ornaments
    </button>

    <button
      :class="[
        activeType === options.redGreen ? 'bg-orange-300' : 'bg-green',
        'border-2 border-green  px-6 py-2 rounded-lg',
      ]"
      @click="activeType = options.redGreen"
    >
      Show 🔴🟢 ornaments
    </button>

    <button
      :class="[
        activeType === options.redDiagonal ? 'bg-orange-300' : 'bg-green',
        'border-2 border-green  px-6 py-2 rounded-lg',
      ]"
      @click="activeType = options.redDiagonal"
    >
      Show 🔴 diagonal
    </button>

    <button
      :class="[
        activeType === options.random ? 'bg-orange-300' : 'bg-green',
        'border-2 border-green  px-6 py-2 rounded-lg',
      ]"
      @click="activeType = options.random"
    >
      Show 🔴🟢🟡🟠
    </button>
  </div>
  <div class="w-full h-full flex justify-center items-center">
    <ChristmasTree :size="7">
      <template #lights>
        <!-- Put two lights on each section of the tree -->
        <ChristmasLights v-for="i in 2" />
      </template>
      <!-- Only RED ornaments -->
      <template v-if="activeType === options.red" #ornaments>
        <ChristmasOrnament />
      </template>

      <!-- RED and GREEN ornaments -->
      <template v-if="activeType === options.redGreen" #even>
        <ChristmasOrnament color="green" />
      </template>
      <template v-if="activeType === options.redGreen" #odd>
        <ChristmasOrnament color="red" />
      </template>

      <!-- Diagonal RED ornaments -->
      <template v-if="activeType === options.redDiagonal" #diagonal>
        <ChristmasOrnament />
      </template>

      <!-- Diagonal RED ornaments -->
      <template v-if="activeType === options.random" #ornaments>
        <RandomOrnament />
      </template>
    </ChristmasTree>
  </div>
</template>
