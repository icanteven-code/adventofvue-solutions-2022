<script setup lang="ts">
import { getDistanceKm, getDistanceMiles } from '@/utils/distance'
import { useGeolocation } from '@vueuse/core'
import { ref, computed } from 'vue'

// hint: coords.latitude + cords.latitude
const { coords } = useGeolocation()

const unit = ref<'km' | 'mile'>('mile')

const formatedUnit = computed(() => (unit.value === 'km' ? 'KM' : 'miles'))

const toggleUnit = () => {
  unit.value = unit.value === 'km' ? 'mile' : 'km'
}

const distace = computed(() => {
  if (unit.value === 'km') {
    return getDistanceKm(coords.value.latitude, coords.value.longitude)
  }
  return getDistanceMiles(coords.value.latitude, coords.value.longitude)
})
</script>

<template>
  <!-- this should only render a slot -->
  <slot :unit="unit" :distace="distace" :formatedUnit="formatedUnit" :toggleUnit="toggleUnit" />
</template>
