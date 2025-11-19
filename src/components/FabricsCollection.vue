<script setup lang="ts">
import { ref, onMounted } from 'vue'
import QuiltprojectService from '@/services/QuiltprojectService'
import type { fabric } from './_types'
import FabricSwatches from './FabricSwatches.vue'

const emit = defineEmits(['fabricSelected'])

const fabricsCollection = ref<fabric[]>([])

onMounted(async () => {
  const response = await QuiltprojectService.getFabricsCollection()
  fabricsCollection.value = response.data
})
</script>

<template>
  <FabricSwatches :fabrics="fabricsCollection" @fabricSelected="emit('fabricSelected', $event)" />
</template>
<style scoped></style>
