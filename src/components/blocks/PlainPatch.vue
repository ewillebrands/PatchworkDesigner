<script setup lang="ts">
defineProps<{
  fabric: string
}>()
</script>

<template>
  <div class="block" :style="{ 'background-color': `${fabric}` }"></div>
</template>

<style scoped>
.block {
  width: 100px;
  height: 100px;
  border: 1px solid #000000;
}
</style>
