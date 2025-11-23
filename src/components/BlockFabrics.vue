<script setup lang="ts">
import type { fabric } from './_types'
import { onMounted, ref } from 'vue'
import FabricSwatches from './FabricSwatches.vue'
import { useFabricsStore } from '@/stores/fabrics'
import { useBlockDesignsStore } from '@/stores/blockdesigns'

const fabricsStore = useFabricsStore()
const blockDesignsStore = useBlockDesignsStore()

const emit = defineEmits(['fabricSelected'])
const props = defineProps<{
  blockDesignId: number
}>()

const fabricsData = ref<fabric[]>([])

// Fetch fabrics by ids associated with the block design
const fetchFabrics = () => {
  const blockDesign = blockDesignsStore.getById(props.blockDesignId)
  if (!blockDesign) return
  fabricsData.value = []
  for (const fabricId of blockDesign.fabrics ?? []) {
    const fabricData = fabricsStore.getById(fabricId)
    if (fabricData) {
      fabricsData.value.push(fabricData)
    }
  }
  console.log('Fetched fabrics for BlockDesign', props.blockDesignId, fabricsData.value)
}
const ChangeBlockDesignFabric = (oldFabric: number, newFabric: number) => {
  blockDesignsStore.changeBlockDesignFabric(props.blockDesignId, oldFabric, newFabric)
}
onMounted(() => {
  fetchFabrics()
})
</script>

<template>
  <FabricSwatches
    editable
    v-if="fabricsData.length"
    :fabrics="fabricsData"
    @fabricSelected="emit('fabricSelected', $event)"
    @fabricChanged="ChangeBlockDesignFabric($event.oldFabric, $event.newFabric)"
  />
</template>
