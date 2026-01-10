<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBlockDesignsStore } from '@/stores/blockdesigns'
import GenericBlock from './GenericBlock.vue'
import type { BlockDesign } from './_types'

const blockDesignCollection = ref<BlockDesign[]>([])
const blockDesignsStore = useBlockDesignsStore()

onMounted(async () => {
  blockDesignCollection.value = blockDesignsStore.getAll
})
</script>

<template>
  <div class="designList">
    <div v-for="(design, index) in blockDesignCollection" :key="index" class="designItem">
      <GenericBlock :block="design"></GenericBlock>
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
