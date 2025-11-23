<script setup lang="ts">
import { onMounted } from 'vue'
import QuiltprojectService from '@/services/QuiltprojectService'
import type { fabric } from '../_types'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    fabrics?: number[]
  }>(),
  {
    fabrics: () => [1, 2],
  },
)

const fabricsData = ref<fabric[]>([])

onMounted(async () => {
  for (const fabric of props.fabrics) {
    const fabricData = await QuiltprojectService.getFabricById(fabric)
    if (fabricData.data) {
      fabricsData.value.push(fabricData.data)
    } else {
      console.warn(`Fabric not found: ${fabric}`)
    }
  }
})
</script>

<template>
  <svg v-if="fabricsData.length >= 2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M 0 0 V 100 L 100 0 Z" :fill="fabricsData[0].color" />
    <path d="M 0 100 H 100 V 0 Z" :fill="fabricsData[1].color" />
  </svg>
</template>
