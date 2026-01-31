<script setup lang="ts">
import type { quiltDesign } from './_types'
import QuiltBlock from '@/components/QuiltBlock.vue'
import { computed } from 'vue'

const props = defineProps<{
  currentQuiltDesign: quiltDesign
  asThumbnailOfHeight?: number
}>()

const emit = defineEmits(['blockSelected', 'quiltSelected'])

// Calculate scale factor for thumbnail
const scaleFactor = computed(() => {
  if (!props.asThumbnailOfHeight) return 1
  // Assume default full size is based on blockSize * 10
  const fullSize = props.currentQuiltDesign.rows * props.currentQuiltDesign.blockSize * 10
  return props.asThumbnailOfHeight / fullSize
})

// Calculate width based on aspect ratio
const thumbnailWidth = computed(() => {
  if (!props.asThumbnailOfHeight) return undefined
  const aspectRatio = props.currentQuiltDesign.columns / props.currentQuiltDesign.rows
  return props.asThumbnailOfHeight * aspectRatio
})
</script>

<template>
  <p
    v-if="
      !currentQuiltDesign ||
      !currentQuiltDesign.blockList ||
      currentQuiltDesign.blockList.length === 0
    "
  >
    Please use Quilt setup from the toolbox on the top right to start your quilt design.
  </p>
  <div
    v-else
    class="quilt"
    :style="{
      gridTemplateColumns: `repeat(${currentQuiltDesign.columns}, 1fr)`,
      gridTemplateRows: `repeat(${currentQuiltDesign.rows}, 1fr)`,
      border: `${10 * (currentQuiltDesign.border || 0) * scaleFactor}px solid rgb(5, 97, 154)`,
      borderRadius: `${10 * (currentQuiltDesign.radius || 0) * scaleFactor}px`,
      outline: `${10 * (currentQuiltDesign.binding || 0) * scaleFactor}px solid hotpink`,
      ...(props.asThumbnailOfHeight && {
        width: `${thumbnailWidth}px`,
        height: `${props.asThumbnailOfHeight}px`,
        margin: '0',
      }),
    }"
    @click.self="emit('quiltSelected')"
  >
    <QuiltBlock
      v-for="(block, index) in currentQuiltDesign.blockList"
      :key="index"
      :quiltBlock="block"
      :interactive="!asThumbnailOfHeight"
      @blockSelected="emit('blockSelected', block)"
      :style="{
        width: asThumbnailOfHeight ? 'auto' : `${10 * currentQuiltDesign.blockSize}px`,
        height: asThumbnailOfHeight ? 'auto' : `${10 * currentQuiltDesign.blockSize}px`,
      }"
    />
  </div>
</template>

<style scoped>
.quilt {
  display: grid;
  margin: 400px;
}
</style>
