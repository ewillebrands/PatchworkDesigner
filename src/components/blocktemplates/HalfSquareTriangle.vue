<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    fabrics?: string[]
  }>(),
  {
    fabrics: () => ['#2222aa', '#aa2222'],
  },
)
</script>

<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M 0 0 L 100 100 H 0 Z" :fill="props.fabrics[0]" />
    <path d="M 0 0 L 100 100 V 0 Z" :fill="props.fabrics[1]" />
  </svg>
</template>
