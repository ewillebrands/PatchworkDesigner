<script setup lang="ts">
import { onMounted } from 'vue'
import QuiltprojectService from '@/services/QuiltprojectService'
import type { fabric } from '../_types'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    fabrics?: string[]
  }>(),
  {
    fabrics: () => ['black'],
  },
)

const fabricsData = ref<fabric[]>([])

onMounted(async () => {
  console.log('Fetching fabrics for:', props.fabrics)
  for (const fabric of props.fabrics) {
    console.log('Fabric:', fabric)
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
  <svg v-if="fabricsData.length >= 1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M 0 0 H 100 V 100 H 0 Z" :fill="fabricsData[0].color" />
  </svg>
</template>

<style scoped></style>
