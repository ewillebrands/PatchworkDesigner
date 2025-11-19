<script setup lang="ts">
import type { fabric } from './_types'
import { onMounted, ref } from 'vue'
import QuiltprojectService from '@/services/QuiltprojectService'
import FabricSwatches from './FabricSwatches.vue'

const emit = defineEmits(['fabricSelected'])
const props = defineProps<{
  fabricNames: string[] | undefined
}>()

const fabricsData = ref<fabric[]>([])

// Fetch fabrics by names
onMounted(async () => {
  for (const fabric of props.fabricNames ?? []) {
    const fabricData = await QuiltprojectService.getFabricByName(fabric)
    if (fabricData.data) {
      fabricsData.value.push(fabricData.data)
    } else {
      console.warn(`Fabric not found: ${fabric}`)
    }
  }
})
</script>

<template>
  <FabricSwatches
    editable
    v-if="fabricsData.length"
    :fabrics="fabricsData"
    @fabricSelected="emit('fabricSelected', $event)"
  />
</template>
