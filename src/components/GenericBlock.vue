<!-- GenericBlock.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useFabricsStore } from '@/stores/fabrics'
import type { BlockDesign, AtomicBlock, CompoundBlock } from './_types'

const props = defineProps<{
  block: BlockDesign | null
  editable?: boolean
  // For nested rendering, need to know position in parent grid
  gridPosition?: { row: number; col: number }
}>()

const fabricsStore = useFabricsStore()

const type = computed(() => props.block?.type)

// For compound blocks - layout sub-blocks in grid
const gridLayout = computed(() => {
  if (props.block?.type === 'atomic') return null
  const { rows, columns, subBlocks } = props.block as CompoundBlock
  const cellWidth = 100 / columns
  const cellHeight = 100 / rows

  return subBlocks.map((subBlock, index) => ({
    block: subBlock,
    x: (index % columns) * cellWidth,
    y: Math.floor(index / columns) * cellHeight,
    width: cellWidth,
    height: cellHeight,
  }))
})
</script>

<template>
  <!-- Atomic block: render patches -->
  <svg
    v-if="type === 'atomic'"
    :viewBox="(block as AtomicBlock).viewBox || '0 0 100 100'"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <defs>
      <mask
        v-for="patch in (block as AtomicBlock).patches"
        :key="`mask-${block?.id}-${patch.id}`"
        :id="`mask-${block?.id}-${patch.id}`"
      >
        <path :d="patch.path" fill="white" />
      </mask>
    </defs>

    <g
      v-for="patch in (block as AtomicBlock).patches"
      :key="`patch-${block?.id}-${patch.id}`"
      :mask="`url(#mask-${block?.id}-${patch.id})`"
    >
      <path
        class="patch"
        :d="patch.path"
        :fill="fabricsStore.getById(patch.fabricId)?.color"
        stroke="rgba(0,0,0,0.5)"
        stroke-width="0.8"
      />
    </g>
  </svg>

  <!-- Compound block: render grid of sub-blocks -->
  <svg
    v-else-if="type === 'compound'"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <g v-for="(cell, index) in gridLayout" :key="index">
      <svg
        :x="cell.x"
        :y="cell.y"
        :width="cell.width"
        :height="cell.height"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <!-- Recursive: render sub-block (can be atomic or compound) -->
        <GenericBlock :block="cell.block" :editable="editable" />
      </svg>
    </g>
  </svg>
  <svg v-else viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <rect x="0" y="0" width="100" height="100" fill="red" />
  </svg>
</template>
