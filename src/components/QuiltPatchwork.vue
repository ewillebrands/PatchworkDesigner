<script setup lang="ts">
import QuiltBlock from './QuiltBlock.vue'
import type { quilt } from './_types'

const quilt: quilt = {
  blockCountWidth: 4,
  blockCountLength: 6,
  blocks: [
    { name: 'block 1' },
    { name: 'block 2' },
    { name: 'block 3' },
    { name: 'block 4' },
    { name: 'block 5' },
  ],
}
</script>

<template>
  <div
    class="patchwork"
    :style="{
      'grid-template-columns': `repeat(${quilt.blockCountWidth}, 1fr)`,
      'grid-template-rows': `repeat(${quilt.blockCountLength}, 1fr)`,
    }"
  >
    <QuiltBlock v-for="block in quilt.blocks" :key="block.name" />
  </div>
</template>

<style scoped>
.patchwork {
  display: grid;
  /* grid-template-columns: repeat(4, 1fr); */
  /* grid-template-rows: repeat(6, 1fr); */
  background-color: blue;
}
</style>
