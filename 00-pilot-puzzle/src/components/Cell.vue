<template>
  <div class="flex justify-center items-center aspect-square w-28 bg-white">
    <span v-if="value">{{ value }}</span>
    <span v-else-if="isDisabled">-</span>
    <button v-else @click="onClick">Select</button>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    value: String,
    isDisabled: Boolean,
  },
  methods: {
    onClick() {
      this.$emit('on-select', this.id)
    },
  },
}
</script>
