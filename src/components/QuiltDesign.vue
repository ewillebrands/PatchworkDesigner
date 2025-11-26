<script setup lang="ts">
import type { quilt } from './_types'
import quiltBlock from '@/components/QuiltBlock.vue'

defineProps<{
  quiltDesign: quilt
}>()

const emit = defineEmits(['blockSelected', 'quiltSelected'])
</script>

<template>
  <p v-if="quiltDesign.blockList.length === 0">
    Please use Quilt setup from the toolbox on the top right to start your quilt design.
  </p>
  <div
    v-if="quiltDesign.blockList.length > 0"
    class="quilt"
    :style="{
      gridTemplateColumns: `repeat(${quiltDesign.columns}, 1fr)`,
      gridTemplateRows: `repeat(${quiltDesign.rows}, 1fr)`,
      border: `${10 * quiltDesign.border}px solid rgb(5, 97, 154)`,
      borderRadius: `${10 * quiltDesign.radius}px`,
      outline: `${10 * quiltDesign.binding}px solid hotpink`,
    }"
    @click="emit('quiltSelected')"
  >
    <component
      v-for="(block, index) in quiltDesign.blockList"
      :key="index"
      :is="quiltBlock"
      :quiltBlock="block"
      @blockSelected="emit('blockSelected', block)"
      :style="{
        width: `${10 * quiltDesign.blockSize}px`,
        height: `${10 * quiltDesign.blockSize}px`,
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
