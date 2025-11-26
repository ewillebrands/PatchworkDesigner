<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFabricsStore } from '@/stores/fabrics'
import type { fabric } from './_types'
import FabricSwatches from './FabricSwatches.vue'

const emit = defineEmits(['fabricSelected'])

const fabricsCollection = ref<fabric[]>([])
const fabricsStore = useFabricsStore()

onMounted(() => {
  fabricsCollection.value = fabricsStore.getAll
})
</script>

<template>
  <FabricSwatches :fabrics="fabricsCollection" @fabricSelected="emit('fabricSelected', $event)" />
</template>
<style scoped></style>
