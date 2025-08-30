<script setup lang="ts">
import type { quilt } from './_types'

defineProps<{
  quiltDesign: quilt
}>()
</script>

<template>
  <div
    v-if="quiltDesign.blockList.length > 0"
    class="patchwork"
    :style="{
      gridTemplateColumns: `repeat(${quiltDesign.columns}, 1fr)`,
      gridTemplateRows: `repeat(${quiltDesign.rows}, 1fr)`,
      border: `${10 * quiltDesign.border}px solid rgb(5, 97, 154)`,
      borderRadius: `${10 * quiltDesign.radius}px`,
      outline: `${10 * quiltDesign.binding}px solid hotpink`,
    }"
  >
    <component
      v-for="block in quiltDesign.blockList"
      :key="block.position"
      :is="block.design"
      :style="{
        width: `${10 * quiltDesign.blockSize}px`,
        height: `${10 * quiltDesign.blockSize}px`,
      }"
    />
  </div>
</template>

<style scoped>
.patchwork {
  display: grid;
  margin: 20px;
}
</style>
