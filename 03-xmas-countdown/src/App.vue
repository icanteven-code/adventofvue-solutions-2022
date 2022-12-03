<script setup>
import { computed, watch, ref } from 'vue'
import CountdownHeader from '@/components/CountdownHeader.vue'
import CountdownSegment from './components/CountdownSegment.vue'
import { useNow } from '@vueuse/core'
import { formatDuration, intervalToDuration } from 'date-fns'

const now = useNow()
const christmas = new Date('12/25/2022 00:00:00')
const christmasTime = christmas.getTime()

const persistedTime = localStorage.getItem('xmas-timer')
  ? JSON.parse(localStorage.getItem('xmas-timer'))
  : {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

const days = ref(persistedTime.days)
const hours = ref(persistedTime.hours)
const minutes = ref(persistedTime.minutes)
const seconds = ref(persistedTime.seconds)

const secondsLeft = computed(() => parseInt((christmasTime - now.value.getTime()) / 1000, 10))

// watch(secondsLeft, (newTime, oldTime) => {
//   if (newTime !== oldTime) {
//     let availableSeconds = newTime
//     const secondsInDay = 86400
//     const secondsInHour = 3600
//     const secondsInMin = 60

//     const calcDays = parseInt(availableSeconds / secondsInDay, 10)
//     availableSeconds -= calcDays * secondsInDay

//     const calcHours = parseInt(availableSeconds / secondsInHour, 10)
//     availableSeconds -= calcHours * secondsInHour

//     const calcMinutes = parseInt(availableSeconds / secondsInMin, 10)
//     availableSeconds -= calcMinutes * secondsInMin

//     days.value = calcDays
//     hours.value = calcHours
//     minutes.value = calcMinutes
//     seconds.value = availableSeconds
//   }

watch(secondsLeft, (newTime, oldTime) => {
  if (newTime !== oldTime) {
    const duration = intervalToDuration({
      start: now.value,
      end: christmas,
    })

    const format = ['days', 'hours', 'minutes', 'seconds']
    const durationStr = formatDuration(duration, { format })
    const timeStrings = durationStr.split(' ').filter(el => !format.includes(el))

    days.value = Number(timeStrings[0] || 0)
    hours.value = Number(timeStrings[1] || 0)
    minutes.value = Number(timeStrings[2] || 0)
    seconds.value = Number(timeStrings[3] || 0)

    localStorage.setItem(
      'xmas-timer',
      JSON.stringify({ days: days.value, hours: hours.value, minutes: minutes.value, seconds: seconds.value })
    )
  }
})

const itsChristmas = computed(() => secondsLeft < 0)
</script>

<template>
  <div class="w-full h-full flex justify-center items-center p-10">
    <div>
      <div class="shadow-md relative bg-white p-5 rounded-lg border-gray-100 border-[1px]">
        <CountdownHeader />
        <main v-if="!itsChristmas" class="flex justify-center">
          <CountdownSegment label="days" :number="days" />
          <CountdownSegment label="hours" :number="hours" />
          <CountdownSegment label="minutes" :number="minutes" />
          <CountdownSegment label="seconds" :number="seconds" />
        </main>

        <p v-else>IT'S CHRISTMAS!!!</p>
      </div>
      <h4 class="mt-10 text-gray-400 text-center text-sm">
        This challenge brought to you by <a href="https://vueschool.io/" class="underline">Vue School</a>
      </h4>
    </div>
  </div>
</template>

<style>
div {
  display: block;
}

body {
  @apply bg-gray-100;
}
</style>
