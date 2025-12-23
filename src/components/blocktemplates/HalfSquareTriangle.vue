<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useFabricsStore } from '@/stores/fabrics'
import type { fabric } from '../_types'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    fabrics?: number[]
    editable?: boolean
  }>(),
  // default black and white fabrics if none provided
  {
    fabrics: () => [1, 2],
  },
)

const emit = defineEmits(['patchSelected'])

const fabricsData = ref<fabric[]>([])
const fabricsStore = useFabricsStore()

function loadFabricsFromIds() {
  fabricsData.value = []
  for (const fabricId of props.fabrics ?? []) {
    const fabricData = fabricsStore.getById(fabricId)
    if (fabricData) {
      fabricsData.value.push(fabricData)
    }
  }
}

onMounted(async () => {
  loadFabricsFromIds()
})

watch(
  () => props.fabrics,
  () => {
    loadFabricsFromIds()
  },
  { immediate: true, deep: true },
)

function selectPatch(patch: number) {
  emit('patchSelected', patch)
}
</script>

<template>
  <svg v-if="fabricsData.length >= 2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="patch"
      d="M 0 0 V 100 L 100 0 Z"
      :fill="fabricsData[0].color"
      @click="props.editable && selectPatch(0)"
    />
    <path
      class="patch"
      d="M 0 100 H 100 V 0 Z"
      :fill="fabricsData[1].color"
      @click="props.editable && selectPatch(1)"
    />
  </svg>
</template>
