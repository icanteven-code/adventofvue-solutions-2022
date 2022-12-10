<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  url: String,
})

const router = useRouter()

const onClick = () => {
  router.push(props.url)
}
</script>

<template>
  <button class="ui-btn" @click="onClick">
    <slot />
  </button>
</template>
