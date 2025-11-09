<script setup lang="ts">
import type { fabric } from './_types'

const emit = defineEmits(['fabricSelected'])
defineProps<{
  fabrics: fabric[]
}>()
</script>

<template>
  <div class="swatches" v-if="fabrics.length">
    <div
      v-for="(fabric, index) in fabrics"
      :key="index"
      class="swatch"
      :style="{ backgroundColor: `${fabric.color}` }"
      :title="fabric.name"
      @click="emit('fabricSelected', fabric.color)"
    ></div>
  </div>
  <div v-else>Loading fabrics…</div>
</template>

<style scoped>
.swatches {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.swatch {
  width: 80px;
  height: 80px;
  border: 4px solid #ffffff;
  border-radius: 99px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
</style>
