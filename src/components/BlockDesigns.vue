<script setup lang="ts">
import { computed } from 'vue'
import { useBlockDesignsStore } from '@/stores/blockdesigns'
import GenericBlock from './GenericBlock.vue'

const blockDesignsStore = useBlockDesignsStore()

const blockDesignCollection = computed(() => blockDesignsStore.getAll)
</script>

<template>
  <div class="designList">
    <router-link
      v-for="design in blockDesignCollection"
      :key="design.id"
      class="designItem"
      :to="{ name: 'blockdesign', params: { name: design.name } }"
    >
      <GenericBlock :block="design"></GenericBlock>
      <span>{{ design.name }}</span>
    </router-link>
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
  text-decoration: none;

  span {
    text-align: center;
    height: 2.4rem;
    line-height: 120%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
}
</style>
