<script setup lang="ts">
defineProps<{
  fabric: string
}>()
</script>

<template>
  <div class="triangle"></div>
</template>

<style scoped>
.block {
  width: 100px;
  height: 100px;
  border: 1px solid #000000;
}
.triangle {
  width: 0;
  height: 0;
  border: solid 50px;
  border-color: blue blue black black;
}
</style>
