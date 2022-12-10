<script setup>
import Button from "../components/Button.vue"
import {routeOpts} from "../router"
</script>

<template>
  <div>
    <h1 class="text-4xl text-center mb-8">Welcome to your Secret Santa Clues!</h1>

    <Button :url="routeOpts.hint1">
      Start your journey
    </Button>
  </div>
</template>
