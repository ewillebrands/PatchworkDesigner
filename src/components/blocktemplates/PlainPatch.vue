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
  <div class="block" :style="{ backgroundColor: `${props.fabrics[0]}` }"></div>
</template>

<style scoped>
.block {
  width: 100px;
  height: 100px;
  border: 1px solid #000000;
}
</style>
