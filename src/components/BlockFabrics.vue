<script setup lang="ts">
import type { fabric } from './_types'
import { computed } from 'vue'
import FabricSwatches from './FabricSwatches.vue'
import { useFabricsStore } from '@/stores/fabrics'
import { useBlockDesignsStore } from '@/stores/blockdesigns'

const fabricsStore = useFabricsStore()
const blockDesignsStore = useBlockDesignsStore()

const emit = defineEmits(['fabricSelected'])
const props = defineProps<{
  blockDesignId: number
}>()

// reactive reference to the block design in the store
const currentDesign = computed(() =>
  blockDesignsStore.getById ? blockDesignsStore.getById(props.blockDesignId) : undefined,
)

// map design.fabrics (ids or strings) -> fabric objects from fabrics store
const fabricsForDesign = computed<fabric[]>(() => {
  const design = currentDesign.value
  if (!design || !Array.isArray(design.fabrics)) return []
  return design.fabrics
    .map((fid) => {
      const id = typeof fid === 'string' ? parseInt(fid, 10) : fid
      if (Number.isNaN(id)) return null
      return fabricsStore.getById ? fabricsStore.getById(id) : null
    })
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
