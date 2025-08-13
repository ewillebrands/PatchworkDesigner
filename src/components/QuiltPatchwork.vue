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
  border: 0.5,
  binding: true,
  rounded: 0.25,
}
</script>

<template>
  <div
    class="patchwork"
    :style="{
      'grid-template-columns': `repeat(${quilt.blockCountWidth}, 1fr)`,
      'grid-template-rows': `repeat(${quilt.blockCountLength}, 1fr)`,
      border: `${100 * quilt.border}px solid rgb(5, 97, 154)`,
      'border-radius': `${100 * quilt.rounded}px`,
      outline: quilt.binding ? `5px solid hotpink` : 0,
    }"
  >
    <QuiltBlock v-for="block in quilt.blocks" :key="block.name" />
  </div>
</template>

<style scoped>
.patchwork {
  display: grid;
  background-color: rgb(5, 97, 154);
}
</style>
