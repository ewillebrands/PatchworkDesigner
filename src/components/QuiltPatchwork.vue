<script setup lang="ts">
import PlainBlock from './blocks/PlainPatch.vue'
import type { quilt, block } from './_types'
import HalfSquareTriangle from './blocks/HalfSquareTriangle.vue'

let blockList: block[] = []

const quilt: quilt = {
  blockCountWidth: 3,
  blockCountLength: 3,
  blocks: blockList,
  border: 0.5,
  binding: true,
  rounded: 0.25,
}

function initBlocks(x: number, y: number) {
  blockList = []
  const totalBlocks = x * y
  for (let count = 0; count < totalBlocks; count++) {
    blockList.push({ name: `block ${count + 1}` })
  }
  quilt.blocks = blockList
  console.log(blockList)
}

// initBlocks(quilt.blockCountWidth, quilt.blockCountLength)

function startDesign() {
  const form = document.getElementById('startdesign') as HTMLFormElement

  // get input elements and their values and put them into quilt props
  const rows = form.elements.namedItem('rows') as HTMLInputElement
  const columns = form.elements.namedItem('columns') as HTMLInputElement
  quilt.blockCountLength = parseInt(rows.value)
  quilt.blockCountWidth = parseInt(columns.value)

  initBlocks(quilt.blockCountWidth, quilt.blockCountLength)
  console.log('design started')
  console.log(quilt)
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
    <PlainBlock v-for="block in quilt.blocks" :key="block.name" fabric="#05619a" />
  </div>
  <form id="startdesign" action="">
    <legend>Choose the width and height of your quilt</legend>

    <label for="rows">Amount of rows</label>
    <input type="number" id="rows" name="rows" min="1" max="20" />

    <label for="columns">Amount of columns</label>
    <input type="number" id="columns" name="columns" min="1" max="20" />

    <!-- ToDo <label for="blocksize">Block size</label>
    <select name="blocksize" id="blocksize">
      <option value="">--Please choose an option--</option>
      <option value="8">8"</option>
      <option value="10">10"</option>
      <option value="12">12"</option>
      <option value="15">15"</option>
    </select> -->

    <button type="button" @click="startDesign">Start to design</button>
  </form>
</template>

<style scoped>
.patchwork {
  display: grid;
  background-color: #05619a;
}
</style>
