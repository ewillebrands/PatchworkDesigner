<script setup lang="ts">
import type { quiltDesign } from './_types'
import QuiltBlock from '@/components/QuiltBlock.vue'

defineProps<{
  currentQuiltDesign: quiltDesign
}>()

const emit = defineEmits(['blockSelected', 'quiltSelected'])
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
      border: `${10 * (currentQuiltDesign.border || 0)}px solid rgb(5, 97, 154)`,
      borderRadius: `${10 * (currentQuiltDesign.radius || 0)}px`,
      outline: `${10 * (currentQuiltDesign.binding || 0)}px solid hotpink`,
    }"
    @click.self="emit('quiltSelected')"
  >
    <QuiltBlock
      v-for="(block, index) in currentQuiltDesign.blockList"
      :key="index"
      :quiltBlock="block"
      @blockSelected="emit('blockSelected', block)"
      :style="{
        width: `${10 * currentQuiltDesign.blockSize}px`,
        height: `${10 * currentQuiltDesign.blockSize}px`,
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
