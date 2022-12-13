<template>
  <div>
    <ChristmasTree v-if="size > 1" :size="size - 1">
      <template #lights>
        <slot name="lights" />
      </template>

      <template #ornaments>
        <slot name="ornaments" />
      </template>

      <template #even>
        <slot name="even" />
      </template>

      <template #odd>
        <slot name="odd" />
      </template>

      <template #diagonal>
        <slot name="diagonal" />
      </template>
    </ChristmasTree>

    <!-- Render the different things -->
    <div class="flex flex-row justify-center">
      <!-- Create the tree sections -->
      <div v-for="idx in size" class="relative rounded-full bg-green w-16 h-16 -m-2 flex justify-center items-center">
        <!-- Add lights to each section -->
        <slot name="lights" />

        <slot name="ornaments" />

        <slot v-if="idx % 2 === 0" name="even" />
        <slot v-else name="odd" />

        <slot v-if="idx % 2 !== 0" name="diagonal" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size: number
  }>(),
  {
    size: 1,
  }
)
</script>
