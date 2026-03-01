<!-- GenericBlock.vue -->
<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { useFabricsStore } from '@/stores/fabrics'
import { useBlockDesignsStore } from '@/stores/blockdesigns'
import type { BlockDesign, AtomicBlock, CompoundBlock } from './_types'

const props = withDefaults(
  defineProps<{
    block: BlockDesign | null
    editable?: boolean
    renderPath?: string
  }>(),
  {
    renderPath: 'root',
  },
)

// Generate unique ID for this component instance to avoid mask ID conflicts
const instanceId = computed(() => `${props.renderPath}-${props.block?.id || 'none'}`)

const fabricsStore = useFabricsStore()
const blockDesignsStore = useBlockDesignsStore()
const selectedPieces = computed(() => blockDesignsStore.selectedPieces)

const getAtomicDomId = () => `atomic-${instanceId.value}`
const getCompoundDomId = () => `compound-${instanceId.value}`
const getPatchDomId = (patchId: string | number) => `patch-${instanceId.value}-${patchId}`
const getMaskDomId = (patchId: string | number) => `mask-${instanceId.value}-${patchId}`

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

function getSelectionChainFromPatchClick(event: MouseEvent, patchDomId: string) {
  const ancestorLayerIds = event
    .composedPath()
    .filter((node): node is SVGElement => node instanceof SVGElement)
    .map((node) => node.id)
    .filter((id) => id.startsWith('compound-') || id.startsWith('atomic-'))

  const topToBottomLayers = [...new Set([...ancestorLayerIds].reverse())]
  return [...topToBottomLayers, patchDomId]
}

function getDeepestSelectedIndex(selectionChain: string[]) {
  for (let index = selectionChain.length - 1; index >= 0; index--) {
    if (selectedPieces.value.includes(selectionChain[index])) {
      return index
    }
  }
  return -1
}

function cycleSelection(event: MouseEvent, selectionChain: string[]) {
  const patchIndex = selectionChain.length - 1
  const deepestSelectedIndex = getDeepestSelectedIndex(selectionChain)

  let nextSelectedIndex = -1

  if (event.altKey) {
    nextSelectedIndex = patchIndex
  } else if (deepestSelectedIndex === -1) {
    nextSelectedIndex = 0
  } else if (deepestSelectedIndex < patchIndex) {
    nextSelectedIndex = deepestSelectedIndex + 1
  }

  const remainingSelection = event.shiftKey
    ? selectedPieces.value.filter((id) => !selectionChain.includes(id))
    : []

  if (nextSelectedIndex >= 0) {
    remainingSelection.push(selectionChain[nextSelectedIndex])
  }

  blockDesignsStore.setSelectedPieces(remainingSelection)
}

function handlePatchClick(event: MouseEvent, pieceId: string) {
  event.stopPropagation()

  if (!props.editable) return

  const selectionChain = getSelectionChainFromPatchClick(event, pieceId)
  cycleSelection(event, selectionChain)

  console.log('Patch clicked:', event, pieceId, 'Selection chain:', selectionChain)
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
    class="atomic-block"
    :class="{ selected: selectedPieces.includes(getAtomicDomId()) }"
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
      stroke="none"
      stroke-width="0"
    >
      <path
        class="patch-piece"
        :class="{ selected: selectedPieces.includes(entry.patchDomId) }"
        :id="entry.patchDomId"
        :d="entry.patch.path"
        :fill="fabricsStore.getById(entry.patch.fabricId)?.color"
        stroke="rgba(0,0,0,0.5)"
        stroke-width="0.8"
        @click="handlePatchClick($event, entry.patchDomId)"
      />
    </svg>

    <rect
      v-if="selectedPieces.includes(getAtomicDomId())"
      class="layer-selection-indicator"
      x="0"
      y="0"
      width="100"
      height="100"
      fill="none"
      pointer-events="none"
    />
  </svg>

  <!-- Compound block: render grid of sub-blocks -->
  <svg
    v-else-if="type === 'compound'"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    :id="getCompoundDomId()"
    class="compound-block"
    :class="{ selected: selectedPieces.includes(getCompoundDomId()) }"

  >
    <g v-for="(cell, index) in gridLayout" :key="index">
      <svg
        :x="cell.x"
        :y="cell.y"
        :width="cell.width"
        :height="cell.height"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        stroke="none"
        stroke-width="0"
      >
        <!-- Recursive: render sub-block (can be atomic or compound) -->
        <GenericBlock
          :block="cell.block"
          :editable="editable"
          :render-path="`${props.renderPath}-${index}`"
        />
      </svg>
    </g>

    <rect
      v-if="selectedPieces.includes(getCompoundDomId())"
      class="layer-selection-indicator"
      x="0"
      y="0"
      width="100"
      height="100"
      fill="none"
      vector-effect="non-scaling-stroke"
      pointer-events="none"
    />
  </svg>
  <svg v-else viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <rect x="0" y="0" width="100" height="100" fill="red" />
  </svg>
</template>
