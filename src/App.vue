<script setup lang="ts">
import { shallowReactive } from 'vue'
import type { quilt, block } from './components/_types'
import QuiltPatchwork from './components/QuiltPatchwork.vue'
import QuiltDesignForm from './components/QuiltDesignForm.vue'
import PlainPatch from './components/blocktemplates/PlainPatch.vue'
import HalfSquareTriangle from './components/blocktemplates/HalfSquareTriangle.vue'
import FabricsCollection from './components/FabricsCollection.vue'
import BlockDesigns from './components/BlockDesigns.vue'

const quilt = shallowReactive<{
  columns: number
  rows: number
  blockList: block[]
  border: number
  binding: number
  radius: number
}>({
  columns: 0,
  rows: 0,
  blockList: [],
  border: 0,
  binding: 0,
  radius: 0,
})

function startDesign(quiltDesign: quilt) {
  quilt.columns = quiltDesign.columns
  quilt.rows = quiltDesign.rows
  quilt.border = quiltDesign.border
  quilt.binding = quiltDesign.binding
  quilt.radius = quiltDesign.radius
  console.log('startDesign called')
  initBlocks(quilt.columns, quilt.rows)
  console.log('design started')
  console.log(quilt)
}

function initBlocks(x: number, y: number) {
  quilt.blockList = []
  for (let row = 0; row < y; row++) {
    if (x % 2 === 0 && row % 2 === 0) {
      for (let col = 0; col < x; col++) {
        const count = row * x + col
        quilt.blockList.push({
          design: count % 2 === 0 ? HalfSquareTriangle : PlainPatch,
          position: [row + 1, col + 1],
        })
      }
    } else {
      for (let col = 0; col < x; col++) {
        const count = row * x + col
        quilt.blockList.push({
          design: count % 2 === 0 ? PlainPatch : HalfSquareTriangle,
          position: [row + 1, col + 1],
        })
      }
    }
  }
  console.log(quilt.blockList)
}
function printColor(color: string) {
  console.log(color)
}
</script>

<template>
  <header>
    <h1>Patchwork Designer</h1>
    <p>Some text here</p>
  </header>

  <main>
    <QuiltPatchwork :quiltDesign="quilt" />
    <QuiltDesignForm @startDesign="startDesign" />
    <FabricsCollection @fabricSelected="printColor" />
    <BlockDesigns />
  </main>
</template>

<style scoped></style>
