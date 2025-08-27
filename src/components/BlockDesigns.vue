<script setup lang="ts">
import { ref } from 'vue'
import PlainPatch from './blocktemplates/PlainPatch.vue'
import HalfSquareTriangle from './blocktemplates/HalfSquareTriangle.vue'

const blockDesigns = ref([
  {
    name: 'Simple Square 1',
    component: PlainPatch,
    fabrics: ['#2222aa'],
  },
  {
    name: 'Simple Square 2',
    component: PlainPatch,
    fabrics: ['#aa2222'],
  },
  {
    name: 'Half Square Triangle',
    component: HalfSquareTriangle,
    fabrics: ['#2222aa', '#aa2222'],
  },
])
</script>

<template>
  <div class="blockDesigns">
    <h2>Block Designs</h2>
    <div class="designList">
      <div v-for="(design, index) in blockDesigns" :key="index" class="designItem">
        <component :is="design.component" :fabrics="design.fabrics"></component>
        <span>{{ design.name }}</span>
      </div>
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
  width: 6rem;
  height: 8rem;

  span {
    height: 1.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }
}
</style>
