<script setup lang="ts">
import { ref } from 'vue'

const blockDesigns = ref([
  {
    name: 'Simple Square 1',
    component: 'PlainPatch',
    fabrics: ['#2222aa'],
  },
  {
    name: 'Simple Square 2',
    component: 'PlainPatch',
    fabrics: ['#aa2222'],
  },
  {
    name: 'Half Square Triangle',
    component: 'HalfSquareTriangle',
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
        <p>{{ design.name }}</p>
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
  text-align: center;
}
</style>
