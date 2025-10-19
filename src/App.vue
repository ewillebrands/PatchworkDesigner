<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { quilt, block, blockPosition, initialQuiltDesign } from './components/_types'
import QuiltDesign from './components/QuiltDesign.vue'
import QuiltDesignForm from './components/QuiltDesignForm.vue'
import FabricsCollection from './components/FabricsCollection.vue'
import BlockDesigns from './components/BlockDesigns.vue'
import AccordionPanel from './components/AccordionPanel.vue'
import BlockDesignOptions from './components/BlockDesignOptions.vue'
import SideBar from './components/SideBar.vue'

const quilt = reactive<{
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

function startDesign(initialQuiltDesign: initialQuiltDesign) {
  quilt.columns = initialQuiltDesign.columns
  quilt.rows = initialQuiltDesign.rows
  quilt.blockSize = initialQuiltDesign.blockSize
  quilt.border = initialQuiltDesign.border
  quilt.binding = initialQuiltDesign.binding
  quilt.radius = initialQuiltDesign.radius
  if (initialQuiltDesign.arrangement === 'alternating') {
    alternatingBlocks(quilt.columns, quilt.rows)
  } else {
    rotationalArrangement(quilt.columns, quilt.rows)
  }
}

function alternatingBlocks(x: number, y: number) {
  quilt.blockList = []
  for (let row = 0; row < y; row++) {
    if (x % 2 === 0 && row % 2 === 0) {
      for (let col = 0; col < x; col++) {
        const count = row * x + col
        quilt.blockList.push({
          design: count % 2 === 0 ? 'Simple Square 1' : 'Simple Square 2',
          position: { row: row + 1, col: col + 1 },
        })
      }
    } else {
      for (let col = 0; col < x; col++) {
        const count = row * x + col
        quilt.blockList.push({
          design: count % 2 === 0 ? 'Simple Square 2' : 'Simple Square 1',
          position: { row: row + 1, col: col + 1 },
        })
      }
    }
  }
}
function rotationalArrangement(x: number, y: number) {
  quilt.blockList = []
  for (let row = 0; row < y; row++) {
    if (x % 2 === 0 && row % 2 === 0) {
      for (let col = 0; col < x; col++) {
        const count = row * x + col
        quilt.blockList.push({
          design: 'Half Square Triangle',
          position: { row: row + 1, col: col + 1 },
          rotation: count % 2 === 0 ? 0 : 90,
        })
      }
    } else {
      for (let col = 0; col < x; col++) {
        const count = row * x + col
        quilt.blockList.push({
          design: 'Half Square Triangle',
          position: { row: row + 1, col: col + 1 },
          rotation: count % 2 === 0 ? 270 : 180,
        })
      }
    }
  }
}
function applyBlockDesign(blockPosition: blockPosition, blockdesign: string) {
  console.log('apply design triggered', blockPosition, blockdesign)
  const blockID = quilt.blockList.findIndex(
    (block) => block.position.row === blockPosition.row && block.position.col === blockPosition.col,
  )
  console.log('found blockID', blockID)
  quilt.blockList[blockID].design = blockdesign
}
function applyBlockRotation(blockPosition: blockPosition, blockrotation: number) {
  console.log('apply rotation triggered', blockPosition, blockrotation)
  const blockID = quilt.blockList.findIndex(
    (block) => block.position.row === blockPosition.row && block.position.col === blockPosition.col,
  )
  console.log('found blockID', blockID)
  quilt.blockList[blockID].rotation = blockrotation
}
function printColor(color: string) {
  console.log(color)
}
function selectBlock(block: block) {
  selectionName.value = `Block ${block.position.row}.${block.position.col}`
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

  <main>
    <div class="canvas-viewer" @click="selectQuilt">
      <QuiltDesign :quiltDesign="quilt" @quiltSelected="selectQuilt" @blockSelected="selectBlock" />
    </div>
    <SideBar title="Toolbox">
      <AccordionPanel :title="`${selectionName} Design options`">
        <QuiltDesignForm v-if="selectionName === 'Quilt'" @startDesign="startDesign" />
        <BlockDesignOptions
          v-else
          :selectedBlock="selectedBlock"
          @applyBlockDesign="applyBlockDesign"
          @applyBlockRotation="applyBlockRotation"
        />
      </AccordionPanel>
      <AccordionPanel :title="'Fabrics collection'"
        ><FabricsCollection @fabricSelected="printColor"
      /></AccordionPanel>
      <AccordionPanel :title="'Block designs'">
        <BlockDesigns />
      </AccordionPanel>
    </SideBar>
  </main>
</template>

<style scoped>
header {
  flex-shrink: 0;
  border-bottom: 1px solid var(--color-divider);
}
main {
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  min-height: 0;
  align-items: stretch;
  height: 100%;
}
.canvas-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-grow: 1;
  overflow: auto;
}
</style>
