<script setup lang="ts">
import type { fabric, BlockDesign } from './_types'
import { computed } from 'vue'
import FabricSwatches from './FabricSwatches.vue'
import { useFabricsStore } from '@/stores/fabrics'
import { useBlockDesignsStore } from '@/stores/blockdesigns'

const fabricsStore = useFabricsStore()
const blockDesignsStore = useBlockDesignsStore()

const emit = defineEmits(['fabricSelected'])
const props = defineProps<{
  blockDesignId: string
}>()

// reactive reference to the block design in the store
const currentDesign = computed(() =>
  blockDesignsStore.getById ? blockDesignsStore.getById(props.blockDesignId) : undefined,
)

// map design.fabrics (ids or strings) -> fabric objects from fabrics store
const fabricsForDesign = computed<fabric[]>(() => {
  const design = currentDesign.value
  if (!design) return []

  // Recursively collect all fabricIds from the block design
  const collectFabricIds = (block: BlockDesign): number[] => {
    if (block.type === 'atomic') {
      return block.patches.map((patch) => patch.fabricId)
    } else if (block.type === 'compound') {
      return block.subBlocks.flatMap((subBlock: BlockDesign) => collectFabricIds(subBlock))
    }
    return []
  }

  const fabricIds = collectFabricIds(design)
  console.log('Collected fabricIds:', fabricIds)
  console.log('Design:', design)

  // Get unique fabric objects from the store
  return [...new Set(fabricIds)]
    .map((id) => (fabricsStore.getById ? fabricsStore.getById(id) : null))
    .filter((f): f is fabric => !!f)
})

// handle swap emitted by FabricSwatches -> forward to block store
const handleFabricChanged = ({
  oldFabric,
  newFabric,
}: {
  oldFabric: number
  newFabric: number
}) => {
  blockDesignsStore.changeBlockDesignFabric(props.blockDesignId, oldFabric, newFabric)
}
</script>

<template>
  <FabricSwatches
    editable
    deduplicated
    v-if="fabricsForDesign.length"
    :fabrics="fabricsForDesign"
    @fabricSelected="emit('fabricSelected', $event)"
    @fabricChanged="handleFabricChanged"
  />
</template>
