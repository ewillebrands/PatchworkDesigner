<template>
  <div>
    <h1>Oops</h1>
    <p>The {{ resource }} you are looking for does not exist.</p>
    <RouterLink v-if="resource === 'page'" to="/">Go back to home</RouterLink>
    <RouterLink v-if="resource !== 'page'" to="/">Go back</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps({
  resource: { type: String, required: true, default: 'page' },
})
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  text-align: center;
  margin-top: 50px;
}
</style>
