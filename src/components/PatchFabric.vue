<script setup lang="ts">
import type { fabric } from './_types'
import { computed } from 'vue'
import FabricSwatches from './FabricSwatches.vue'
import { useFabricsStore } from '@/stores/fabrics'
import { useBlockDesignsStore } from '@/stores/blockdesigns'

const fabricsStore = useFabricsStore()
const blockDesignsStore = useBlockDesignsStore()

const props = defineProps<{
  blockDesignId: number
  patch: number
}>()

// reactive reference to the block design in the store
const currentDesign = computed(() =>
  blockDesignsStore.getById ? blockDesignsStore.getById(props.blockDesignId) : undefined,
)

// single fabric object from fabrics store returned in an array
const fabricForPatch = computed<fabric[]>(() => {
  const design = currentDesign.value
  if (!design || design.fabrics[props.patch] === undefined) return []
  const fabricId = design.fabrics[props.patch]
  const fabric = fabricsStore.getById?.(fabricId)
  return fabric ? [fabric] : []
})

// destructure only newFabric, ignore oldFabric (or any other fields)
const handleFabricChanged = ({ newFabric }: { oldFabric?: number; newFabric: number }) => {
  console.log(
    `PatchFabric: changing fabric for patch index ${props.patch} in BlockDesign ${props.blockDesignId} to fabric id ${newFabric}`,
  )
  blockDesignsStore.changeBlockDesignFabricByIndex(props.blockDesignId, props.patch, newFabric)
}
</script>

<template>
  <FabricSwatches
    editable
    deduplicated
    v-if="fabricForPatch"
    :fabrics="fabricForPatch"
    @fabricChanged="handleFabricChanged"
  />
</template>
