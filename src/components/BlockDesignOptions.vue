<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { block } from './_types'
import QuiltprojectService from '@/services/QuiltprojectService'
import type { BlockDesign } from './_types'

const props = defineProps<{
  selectedBlock: block | null
}>()

const blockDesigns = ref<BlockDesign[]>([])
//object for mapping formfields to block properties
const formFields = ref({
  blockDesign: props.selectedBlock?.design || '',
})

// Watch for changes in selectedBlock
watch(
  () => props.selectedBlock,
  (newBlock) => {
    if (newBlock) {
      formFields.value.blockDesign = newBlock.design
    }
  },
)
onMounted(async () => {
  const response = await QuiltprojectService.getBlockDesigns()
  blockDesigns.value = response.data
})
</script>

<template>
  <form action="">
    <div class="field">
      <label for="blockdesign">Design</label>
      <select v-model="formFields.blockDesign" name="blockdesign" id="blockdesign">
        <option v-for="design in blockDesigns" :key="design.id">{{ design.name }}</option>
      </select>
    </div>
    <p>Rotation: {{ selectedBlock?.rotation || 0 }} degrees</p>
  </form>
</template>
