<script setup lang="ts">
import type { blockDesign } from '@/components/_types'
import { defineProps, onMounted, ref } from 'vue'
import QuiltprojectService from '@/services/QuiltprojectService'

const props = defineProps<{
  currentdesign: string
}>()

const currentBlockDesign = ref<blockDesign>()

onMounted(async () => {
  const response = await QuiltprojectService.getBlockDesignByName(props.currentdesign)
  currentBlockDesign.value = response.data
})
</script>

<template>
  <div v-if="currentBlockDesign">
    <h1>{{ currentBlockDesign.name }}</h1>
    <component :is="currentBlockDesign.component" :fabrics="currentBlockDesign.fabrics"></component>
  </div>
</template>
