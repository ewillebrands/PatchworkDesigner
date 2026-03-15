<script setup lang="ts">
import { computed, onUpdated } from 'vue'
import FabricSwatches from './FabricSwatches.vue'

import { useBlockDesignsStore } from '@/stores/blockdesigns'

const blockDesignsStore = useBlockDesignsStore()

const props = defineProps<{
  blockDesignId: string
}>()

const selection = computed(() => blockDesignsStore.selectedPieces)

// object with fabricIds from blockdesignstore returned in an array
const fabricIds = computed(() =>
  blockDesignsStore.getFabricIdsForSelectedPieces(props.blockDesignId),
)

// destructure only newFabric, ignore oldFabric (or any other fields)
const handleFabricChanged = ({ newFabric }: { oldFabric?: string; newFabric: string }) => {
  console.log(
    `PatchFabric: changing fabric for selection ${selection.value} in BlockDesign ${props.blockDesignId} to fabric id ${newFabric}`,
  )
  // blockDesignsStore.changePatchFabric(props.blockDesignId, props.patch, newFabric)
}

onUpdated(() => {
  console.log(
    'SelectionFabrics updated with blockDesignId',
    props.blockDesignId,
    'and selection',
    selection.value,
    'and fabricIds',
    fabricIds.value,
  )
})
</script>

<template>
  <FabricSwatches
    editable
    v-if="fabricIds.length > 0"
    :fabrics="fabricIds"
    @fabricChanged="handleFabricChanged"
  />
</template>
