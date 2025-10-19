<script setup lang="ts">
import { ref, onMounted, watch, defineEmits } from 'vue'
import type { block } from './_types'
import QuiltprojectService from '@/services/QuiltprojectService'
import type { blockDesign } from './_types'

const props = defineProps<{
  selectedBlock: block | null
}>()

const emit = defineEmits(['applyBlockDesign', 'applyBlockRotation'])

const blockDesigns = ref<blockDesign[]>([])
//object for mapping formfields to block properties
const formFields = ref({
  blockDesign: props.selectedBlock?.design || '',

  //invisible field for rotation
  blockRotation: props.selectedBlock?.rotation || 0,
})

// Watch for changes in selectedBlock
watch(
  () => props.selectedBlock,
  (newBlock) => {
    if (newBlock) {
      formFields.value.blockDesign = newBlock.design
      formFields.value.blockRotation = newBlock.rotation || 0
    }
  },
)
onMounted(async () => {
  const response = await QuiltprojectService.getBlockDesigns()
  blockDesigns.value = response.data
})

function handleDesignChange() {
  console.log('design changed', formFields.value.blockDesign, props.selectedBlock?.position)
  emit('applyBlockDesign', props.selectedBlock?.position, formFields.value.blockDesign)
}

function handleRotationChange() {
  console.log('rotation changed', formFields.value.blockRotation, props.selectedBlock?.position)
  emit('applyBlockRotation', props.selectedBlock?.position, formFields.value.blockRotation)
}

function rotateLeft() {
  formFields.value.blockRotation = (formFields.value.blockRotation - 90) % 360
  handleRotationChange()
}

function rotateRight() {
  formFields.value.blockRotation = (formFields.value.blockRotation + 90) % 360
  handleRotationChange()
}
</script>

<template>
  <form action="">
    <div class="field">
      <label for="blockdesign">Design</label>
      <select
        v-model="formFields.blockDesign"
        name="blockdesign"
        id="blockdesign"
        @change="handleDesignChange"
      >
        <option v-for="design in blockDesigns" :key="design.id">{{ design.name }}</option>
      </select>
    </div>
    <div class="buttons">
      <button @click.prevent="rotateLeft">Rotate Left</button>
      <button @click.prevent="rotateRight">Rotate Right</button>
    </div>
    <p>Rotation: {{ selectedBlock?.rotation }} degrees</p>
  </form>
</template>

<style scoped>
.buttons {
  display: flex;
  gap: 12px;
}
</style>
