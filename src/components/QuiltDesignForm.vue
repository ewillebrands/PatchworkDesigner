<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['startDesign'])

//object for mapping formfields to quilt properties
const formFields = ref({
  rows: 4,
  columns: 4,
  blockSize: '12',
  border: 10,
  binding: 3 / 8,
  radius: 2,
})
</script>

<template>
  <form id="startdesign" @submit.prevent="emit('startDesign', formFields)">
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
        <select v-model="formFields.blockSize" name="blocksize" id="blocksize">
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
        <input
          v-model="formFields.border"
          type="number"
          id="border"
          name="border"
          min="0"
          max="20"
        />
      </div>
      <div class="field">
        <label for="binding">Binding in inches</label>
        <input
          v-model="formFields.binding"
          type="number"
          id="binding"
          name="binding"
          step="0.125"
          min="0"
          max="2"
        />
      </div>
      <div class="field">
        <label for="radius">Corner radius in inches</label>
        <input
          v-model="formFields.radius"
          type="number"
          id="radius"
          name="radius"
          min="0"
          max="20"
        />
      </div>
    </fieldset>

    <button type="submit">Start Designing</button>
  </form>
</template>
