<script setup lang="ts">
import { computed } from 'vue'
import FabricSwatches from './FabricSwatches.vue'

import { useBlockDesignsStore } from '@/stores/blockdesigns'

const blockDesignsStore = useBlockDesignsStore()

const props = defineProps<{
  blockDesignId: string
}>()

const selection = computed(() => blockDesignsStore.selectedPieces)

// object with fabricIds from blockdesignstore returned in an array
const fabricsForSelection = computed(() => blockDesignsStore.getFabricsForSelectedPieces)

// destructure only newFabric, ignore oldFabric (or any other fields)
const handleFabricChanged = ({ newFabric }: { oldFabric?: string; newFabric: string }) => {
  console.log(
    `PatchFabric: changing fabric for selection ${selection.value} in BlockDesign ${props.blockDesignId} to fabric id ${newFabric}`,
  )
  // blockDesignsStore.changePatchFabric(props.blockDesignId, props.patch, newFabric)
}
</script>

<template>
  <FabricSwatches
    editable
    deduplicated
    v-if="fabricsForSelection.length > 0"
    :fabrics="fabricsForSelection"
    @fabricChanged="handleFabricChanged"
  />
</template>
