<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { initialQuiltDesign } from './_types'
import { useQuiltDesignsStore } from '@/stores/quiltdesigns'
import type { quiltDesign } from './_types'
import { useRouter } from 'vue-router'

const quiltDesignsStore = useQuiltDesignsStore()
const router = useRouter()

const dialog = ref<HTMLDialogElement | null>(null)

const initialFormFields = {
  name: '',
  rows: 4,
  columns: 4,
  blockSize: 12,
  arrangement: 'alternating',
}

const formFields = ref({ ...initialFormFields })

function closeDialog() {
  if (dialog.value) {
    dialog.value.close()
    formFields.value = { ...initialFormFields }
  }
}

const newQuiltDesign = reactive<quiltDesign>({} as quiltDesign)

function startDesign(initialQuiltDesign: initialQuiltDesign) {
  newQuiltDesign.name = initialQuiltDesign.name
  newQuiltDesign.columns = initialQuiltDesign.columns
  newQuiltDesign.rows = initialQuiltDesign.rows
  newQuiltDesign.blockSize = initialQuiltDesign.blockSize
  if (initialQuiltDesign.arrangement === 'alternating') {
    alternatingBlocks(newQuiltDesign.columns, newQuiltDesign.rows)
  } else {
    rotationalArrangement(newQuiltDesign.columns, newQuiltDesign.rows)
  }
  quiltDesignsStore.addQuiltDesign(newQuiltDesign)
  router.push({ name: 'quiltdesign', params: { name: newQuiltDesign.name } })
}

//functions to create blocklist based on arrangement choice:
//use 2 simple square designs for alternating blocks
function alternatingBlocks(x: number, y: number) {
  newQuiltDesign.blockList = []
  for (let row = 0; row < y; row++) {
    if (x % 2 === 0 && row % 2 === 0) {
      for (let col = 0; col < x; col++) {
        const count = row * x + col
        newQuiltDesign.blockList.push({
          design: count % 2 === 0 ? 'Simple Square 1' : 'Simple Square 2',
          position: { row: row + 1, col: col + 1 },
        })
      }
    } else {
      for (let col = 0; col < x; col++) {
        const count = row * x + col
        newQuiltDesign.blockList.push({
          design: count % 2 === 0 ? 'Simple Square 2' : 'Simple Square 1',
          position: { row: row + 1, col: col + 1 },
        })
      }
    }
  }
}
//use single half square triangle design for rotational arrangement
function rotationalArrangement(x: number, y: number) {
  newQuiltDesign.blockList = []
  for (let row = 0; row < y; row++) {
    if (row % 2 === 0) {
      for (let col = 0; col < x; col++) {
        const count = row * x + col
        newQuiltDesign.blockList.push({
          design: 'Half Square Triangle',
          position: { row: row + 1, col: col + 1 },
          rotation: count % 2 === 0 ? 0 : 90,
        })
      }
    } else {
      for (let col = 0; col < x; col++) {
        const count = row * x + col
        newQuiltDesign.blockList.push({
          design: 'Half Square Triangle',
          position: { row: row + 1, col: col + 1 },
          rotation: count % 2 === 0 ? 270 : 180,
        })
      }
    }
  }
}
</script>
<template>
  <dialog ref="dialog">
    <h2>Create New Quilt Design</h2>
    <form id="startdesign" @submit.prevent="startDesign(formFields)" @reset.prevent="closeDialog">
      <div class="field">
        <label for="name">Name</label>
        <input v-model="formFields.name" type="text" id="name" name="name" required />
      </div>

      <fieldset>
        <legend>Blocks</legend>
        <div class="controlgroup">
          <div class="field">
            <label for="rows">Rows</label>
            <input
              v-model.number="formFields.rows"
              type="number"
              id="rows"
              name="rows"
              min="1"
              max="20"
            />
          </div>
          <div class="field">
            <label for="columns">Columns</label>
            <input
              v-model.number="formFields.columns"
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
          <select v-model.number="formFields.blockSize" name="blocksize" id="blocksize">
            <option :value="8">8"</option>
            <option :value="10">10"</option>
            <option :value="12">12"</option>
            <option :value="15">15"</option>
          </select>
        </div>
        <div class="field">
          <label for="arrangement">Arrangement</label>
          <select v-model="formFields.arrangement" name="arrangement" id="arrangement">
            <option value="alternating">alternating blocks</option>
            <option value="rotational">rotational arrangement</option>
          </select>
        </div>
      </fieldset>
      <div class="controlgroup">
        <button id="cancel" type="reset">Cancel</button>
        <button type="submit">Start Designing</button>
      </div>
    </form>
  </dialog>
  <div>
    <button @click="dialog && dialog.showModal()">Create new quilt design</button>
  </div>
</template>

<style scoped></style>
