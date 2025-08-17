<script setup lang="ts">
import { reactive } from 'vue'
import PlainBlock from './blocktemplates/PlainPatch.vue'
import type { quilt } from './_types'
import HalfSquareTriangle from './blocktemplates/HalfSquareTriangle.vue'

const quilt = reactive<quilt>({
  blockCountWidth: 0,
  blockCountLength: 0,
  blockList: [],
  border: 0.5,
  binding: true,
  rounded: 0.25,
})

function initBlocks(x: number, y: number) {
  quilt.blockList = []
  const totalBlocks = x * y
  for (let count = 0; count < totalBlocks; count++) {
    if (count % 2 === 0) {
      quilt.blockList.push({ design: PlainBlock, position: [count + 1, count + 1] })
    } else {
      quilt.blockList.push({ design: HalfSquareTriangle, position: [count + 1, count + 1] })
    }
  }
  console.log(quilt.blockList)
}

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
    <component v-for="block in quilt.blockList" :key="block.position" :is="block.design" />
  </div>
  <form id="startdesign" action="">
    <legend>Choose the width and height of your quilt</legend>

    <label for="rows">Amount of rows</label>
    <input type="number" id="rows" name="rows" min="1" max="20" />

    <label for="columns">Amount of columns</label>
    <input type="number" id="columns" name="columns" min="1" max="20" />

    <button type="button" @click="startDesign">Start to design</button>
  </form>
</template>

<style scoped>
.patchwork {
  display: grid;
  background-color: #05619a;
}
</style>
