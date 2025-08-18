<script setup lang="ts">
import { shallowReactive, ref } from 'vue'
import PlainBlock from './blocktemplates/PlainPatch.vue'
import type { quilt } from './_types'
import HalfSquareTriangle from './blocktemplates/HalfSquareTriangle.vue'

const quilt = shallowReactive<quilt>({
  blockCountWidth: 0,
  blockCountLength: 0,
  blockList: [],
  border: 0,
  binding: 0,
  radius: 0,
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

//object for mapping formfields to quilt properties
const formFields = ref({
  rows: 4,
  columns: 4,
  blocksize: '',
  border: 10,
  binding: 0.5,
  radius: 5,
})

function startDesign() {
  quilt.blockCountWidth = formFields.value.columns
  quilt.blockCountLength = formFields.value.rows
  quilt.border = formFields.value.border
  quilt.binding = formFields.value.binding
  quilt.radius = formFields.value.radius
  // console.log('startDesign called')

  initBlocks(quilt.blockCountWidth, quilt.blockCountLength)
  console.log('design started')
  console.log(quilt)
}
</script>

<template>
  <div
    v-if="quilt.blockList.length > 0"
    class="patchwork"
    :style="{
      gridTemplateColumns: `repeat(${quilt.blockCountWidth}, 1fr)`,
      gridTemplateRows: `repeat(${quilt.blockCountLength}, 1fr)`,
      border: `${10 * quilt.border}px solid rgb(5, 97, 154)`,
      borderRadius: `${10 * quilt.radius}px`,
      outline: `${10 * quilt.binding}px solid hotpink`,
    }"
  >
    <component v-for="block in quilt.blockList" :key="block.position" :is="block.design" />
  </div>
  <form id="startdesign" action="">
    <fieldset>
      <legend>Blocks</legend>
      <div class="controlgroup">
        <div class="field">
          <label for="rows">Rows</label>
          <input v-model="formFields.rows" type="number" id="rows" name="rows" min="1" max="20" />
        </div>
        <div class="field">
          <label for="columns">Columns</label>
          <input
            v-model="formFields.columns"
            type="number"
            id="columns"
            name="columns"
            min="1"
            max="20"
          />
        </div>
      </div>

      <div class="field">
        <label for="blocksize">Block size</label>
        <select name="blocksize" id="blocksize">
          <option value="">--Pick a size--</option>
          <option value="8">8"</option>
          <option value="10">10"</option>
          <option value="12">12"</option>
          <option value="15">15"</option>
        </select>
      </div>
    </fieldset>
    <fieldset>
      <legend>Border and binding</legend>
      <div class="field">
        <label for="border">Border in inches</label>
        <input v-model="formFields.border" type="number" id="border" name="border" />
      </div>
      <div class="field">
        <label for="binding">Binding in inches</label>
        <input v-model="formFields.binding" type="number" id="binding" name="binding" />
      </div>
      <div class="field">
        <label for="radius">Corner radius in inches</label>
        <input v-model="formFields.radius" type="number" id="radius" name="radius" />
      </div>
    </fieldset>

    <button type="button" @click="startDesign">Start to design</button>
  </form>
</template>

<style scoped>
.patchwork {
  display: grid;
}

/* Form */
</style>
