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
