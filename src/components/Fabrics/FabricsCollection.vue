<script setup lang="ts">
import { computed } from 'vue'
import { useFabricsStore } from '@/stores/fabrics'
import FabricSwatches from './FabricSwatches.vue'

const emit = defineEmits(['fabricSelected'])

const fabricsStore = useFabricsStore()

const fabricsCollection = computed(() => fabricsStore.getAll)
</script>

<template>
  <FabricSwatches :fabrics="fabricsCollection" @fabricSelected="emit('fabricSelected', $event)" />
</template>
<style scoped></style>
