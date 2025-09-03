<script setup lang="ts">
import { shallowReactive, ref } from 'vue'
import type { quilt, block } from './components/_types'
import QuiltPatchwork from './components/QuiltPatchwork.vue'
import QuiltDesignForm from './components/QuiltDesignForm.vue'
import FabricsCollection from './components/FabricsCollection.vue'
import BlockDesigns from './components/BlockDesigns.vue'
import AccordionPanel from './components/AccordionPanel.vue'
import BlockDesignOptions from './components/BlockDesignOptions.vue'

const quilt = shallowReactive<{
  columns: number
  rows: number
  blockList: block[]
  blockSize: number
  border: number
  binding: number
  radius: number
}>({
  columns: 0,
  rows: 0,
  blockList: [],
  blockSize: 0,
  border: 0,
  binding: 0,
  radius: 0,
})

const selectionName = ref('Quilt')
const selectedBlock = ref<block | null>(null)

function startDesign(quiltDesign: quilt) {
  quilt.columns = quiltDesign.columns
  quilt.rows = quiltDesign.rows
  quilt.blockSize = quiltDesign.blockSize
  quilt.border = quiltDesign.border
  quilt.binding = quiltDesign.binding
  quilt.radius = quiltDesign.radius
  alternateBlocks(quilt.columns, quilt.rows)
}

function alternateBlocks(x: number, y: number) {
  quilt.blockList = []
  for (let row = 0; row < y; row++) {
    if (x % 2 === 0 && row % 2 === 0) {
      for (let col = 0; col < x; col++) {
        const count = row * x + col
        quilt.blockList.push({
          design: count % 2 === 0 ? 'Simple Square 1' : 'Simple Square 2',
          position: [row + 1, col + 1],
        })
      }
    } else {
      for (let col = 0; col < x; col++) {
        const count = row * x + col
        quilt.blockList.push({
          design: count % 2 === 0 ? 'Simple Square 2' : 'Simple Square 1',
          position: [row + 1, col + 1],
        })
      }
    }
  }
}
function printColor(color: string) {
  console.log(color)
}
function printBlockProperties(block: block) {
  console.log(block)
  selectionName.value = `Block ${block.position}`
  selectedBlock.value = block
}

function selectQuilt() {
  console.log(quilt)
  selectionName.value = 'Quilt'
  selectedBlock.value = null
}
</script>

<template>
  <header>
    <h1>Quilt Designer</h1>
  </header>

  <main class="main">
    <div class="canvas" @click="selectQuilt">
      <p v-if="quilt.blockList.length === 0">
        Please use Quilt setup on the right to start your quilt design.
      </p>
      <QuiltPatchwork
        :quiltDesign="quilt"
        @quiltSelected="selectQuilt"
        @blockSelected="printBlockProperties"
      />
    </div>
    <div class="toolbar">
      <div class="accordion">
        <AccordionPanel :title="`${selectionName} Design options`">
          <QuiltDesignForm v-if="selectionName === 'Quilt'" @startDesign="startDesign" />
          <BlockDesignOptions v-else :selectedBlock="selectedBlock" />
        </AccordionPanel>
        <AccordionPanel :title="'Fabrics collection'"
          ><FabricsCollection @fabricSelected="printColor"
        /></AccordionPanel>
        <AccordionPanel :title="'Block designs'">
          <BlockDesigns />
        </AccordionPanel>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
}
.canvas {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-grow: 1;
  overflow: auto;
}
.toolbar {
  height: 100vh;
  overflow: auto;
  background-color: var(--color-background-soft);
  width: 36rem;
  padding: 1rem;
}
.accordion {
  width: 100%;
  border: solid var(--color-input-border);
  border-width: 2px 0;
}
</style>
