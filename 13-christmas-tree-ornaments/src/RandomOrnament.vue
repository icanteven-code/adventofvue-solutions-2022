<!-- This has the same basic approach as the Christmas Lights component -->
<template>
  <div
    class="absolute rounded-full w-6 h-6 z-10"
    :class="bgColor"
    :style="{
      top: `${offsetY}px`,
      left: `${offsetX}px`,
    }"
  ></div>
</template>

<script setup lang="ts">
const AMPLIFY = 20
const offsetY = 16 + (Math.random() * AMPLIFY - AMPLIFY / 2)
const offsetX = 16 + (Math.random() * AMPLIFY - AMPLIFY / 2)

const bgColors = ['bg-emerald-200', 'bg-red-500', 'bg-purple-500', 'bg-orange-400', 'bg-yellow-500']
const randomIdx = parseInt(`${(Math.random() * 10) / 2}`, 10)
const bgColor = bgColors[randomIdx]
</script>
