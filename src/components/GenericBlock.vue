<!-- GenericBlock.vue -->
<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { useFabricsStore } from '@/stores/fabrics'
import { useBlockDesignsStore } from '@/stores/blockdesigns'
import type { BlockDesign, AtomicBlock, CompoundBlock } from './_types'

const props = defineProps<{
  block: BlockDesign | null
  editable?: boolean
}>()

// Generate unique ID for this component instance to avoid mask ID conflicts
const instanceId = props.block?.id

const fabricsStore = useFabricsStore()
const blockDesignsStore = useBlockDesignsStore()
const selectedPieces = computed(() => blockDesignsStore.selectedPieces)

const getAtomicDomId = () => `atomic-${instanceId}`
const getCompoundDomId = () => `compound-${instanceId}`
const getPatchDomId = (patchId: string | number) => `patch-${instanceId}-${patchId}`
const getMaskDomId = (patchId: string | number) => `mask-${instanceId}-${patchId}`

const type = computed(() => props.block?.type)

const atomicPatchEntries = computed(() => {
  if (props.block?.type !== 'atomic') return []

  return (props.block as AtomicBlock).patches.map((patch) => ({
    patch,
    patchDomId: getPatchDomId(patch.id),
    maskDomId: getMaskDomId(patch.id),
  }))
})

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

// Emit selected patch ID when a patch is clicked (only if editable)

function handlePatchClick(event: MouseEvent, pieceId: string) {
  if (props.editable) {
    if (!event.shiftKey) {
      blockDesignsStore.clearSelectedPieces()
    }
    if (!selectedPieces.value.includes(pieceId)) {
      blockDesignsStore.addSelectedPieceId(pieceId)
    } else {
      // If already selected, deselect it
      blockDesignsStore.subtractSelectedPieceId(pieceId)
    }
    console.log('Patch clicked:', event, pieceId, 'Selected pieces:', selectedPieces.value)
  }
}
function handleCompoundBlockClick(event: MouseEvent) {
  if (props.editable && !event.altKey) console.log('Compound block clicked:', event)
}
function handleAtomicBlockClick(event: MouseEvent) {
  if (props.editable && !event.altKey) console.log('Atomic block clicked:', event)
}

onUnmounted(() => {
  // Clear selected pieces when unmounted to avoid stale selection
  if (props.editable) blockDesignsStore.clearSelectedPieces()
})
</script>

<template>
  <!-- Atomic block: render patches -->
  <svg
    v-if="type === 'atomic'"
    :viewBox="(block as AtomicBlock).viewBox || '0 0 100 100'"
    :id="getAtomicDomId()"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    @click="handleAtomicBlockClick"
  >
    <defs>
      <mask v-for="entry in atomicPatchEntries" :key="entry.maskDomId" :id="entry.maskDomId">
        <path :d="entry.patch.path" fill="white" />
      </mask>
    </defs>

    <svg
      v-for="entry in atomicPatchEntries"
      :key="entry.patchDomId"
      :mask="`url(#${entry.maskDomId})`"
    >
      <path
        class="patch"
        :class="{ selected: selectedPieces.includes(entry.patchDomId) }"
        :id="entry.patchDomId"
        :d="entry.patch.path"
        :fill="fabricsStore.getById(entry.patch.fabricId)?.color"
        stroke="rgba(0,0,0,0.5)"
        stroke-width="0.8"
        vector-effect="non-scaling-stroke"
        @click="handlePatchClick($event, entry.patchDomId)"
      />
    </svg>
  </svg>

  <!-- Compound block: render grid of sub-blocks -->
  <svg
    v-else-if="type === 'compound'"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    :id="getCompoundDomId()"
    @click="handleCompoundBlockClick"
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
