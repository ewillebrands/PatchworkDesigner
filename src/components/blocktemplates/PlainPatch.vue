<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    fabrics?: string[]
  }>(),
  {
    fabrics: () => ['#22aa22'],
  },
)
</script>

<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M 0 0 H 100 V 100 H 0 Z" :fill="props.fabrics[0]" />
  </svg>
</template>

<style scoped></style>
