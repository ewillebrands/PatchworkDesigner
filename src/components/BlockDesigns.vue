<script setup lang="ts">
import { ref, onMounted } from 'vue'
import QuiltprojectService from '@/services/QuiltprojectService'
import type { BlockDesign } from './_types'

const blockDesigns = ref<BlockDesign[]>([])

onMounted(async () => {
  const response = await QuiltprojectService.getBlockDesigns()
  blockDesigns.value = response.data
})
</script>

<template>
  <div class="designList">
    <div v-for="(design, index) in blockDesigns" :key="index" class="designItem">
      <component :is="design.component" :fabrics="design.fabrics"></component>
      <span>{{ design.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.blockDesigns {
  margin-top: 20px;
}
.designList {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.designItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 6rem;
  gap: 0.5rem;

  span {
    height: 2.4rem;
    line-height: 120%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    display: block;
  }
}
</style>
