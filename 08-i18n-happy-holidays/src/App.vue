<template>
  <main class="flex flex-col justify-center h-full mx-auto max-w-600px">
    <section class="flex flex-col items-center leading-loose text-center">
      <div class="text-3xl">
        <span class="i-twemoji-christmas-tree"></span>
        {{ t('happyHolidays') }}
        <span class="i-twemoji-world-map"></span>
      </div>

      <i18n-t keypath="christmasIsComing" tag="p">
        <template v-slot:date>
          <span>{{ d(christmasDate, 'long') }}</span>
        </template>
        <template v-slot:time>
          <span class="text-green">{{ t('day', { count: daysUntil }) }}</span>
        </template>
      </i18n-t>

      <div class="flex items-center">
        <form action="" @change="onSelect">
          <template v-for="availableL in availableLocales">
            <input
              class="cursor-pointer"
              type="radio"
              :id="availableL"
              name="locale"
              :value="availableL"
              :checked="availableL === locale"
            />
            <label class="cursor-pointer" :for="availableL">{{
              availableL
            }}</label>
          </template>
        </form>

        <div class="ml-6">
          Selected:
          <div :class="flags[locale]"></div>
          {{ t('language') }}
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, d, availableLocales, locale } = useI18n()

const flags = {
  en: 'i-twemoji-flag-for-flag-united-kingdom',
  de: 'i-twemoji-flag-germany',
  'ja-JP': 'i-twemoji-flag-for-flag-japan',
}

const onSelect = event => {
  locale.value = event.target.value
}

// See the README about tricky timezone issues!
// I figured since this is i18n-friendly, we'd wanna
// make sure the timezones were right :-)
const christmasDate = new Date('2022/12/25')
const currentDate = new Date()

let daysUntil = 0
if (currentDate.getTime() < christmasDate.getTime()) {
  daysUntil = christmasDate.getDate() - currentDate.getDate()
}
</script>

<style scoped>
.icon-button {
  @apply text-xl
    w-32px
    h-32px
    rounded-full
    border-1
    border-transparent
    bg-transparent
    cursor-pointer
    duration-300
    hover:ring-2
    hover:border-green-500
    hover:ring-green-500
    hover:ring-opacity-40
    hover:text-green-600;
}
</style>
