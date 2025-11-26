<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { block } from './_types'
import { useBlockDesignsStore } from '@/stores/blockdesigns'
import type { blockDesign } from './_types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowRotateLeft,
  faArrowRotateRight,
  faPenRuler,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'vue-router'

const props = defineProps<{
  selectedBlock: block | null
}>()

const router = useRouter()

const openBlockDesigner = () => {
  if (props.selectedBlock) {
    router.push({
      name: 'blockdesign',
      params: { name: props.selectedBlock.design },
    })
  }
}

const emit = defineEmits(['applyBlockDesign', 'applyBlockRotation'])

const blockDesignCollection = ref<blockDesign[]>([])
const blockDesignsStore = useBlockDesignsStore()
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
onMounted(() => {
  blockDesignCollection.value = blockDesignsStore.getAll
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
        <option v-for="design in blockDesignCollection" :key="design.id">{{ design.name }}</option>
      </select>
    </div>
    <div class="buttons">
      <button @click.prevent="rotateLeft">
        <FontAwesomeIcon :icon="faArrowRotateLeft" />
      </button>
      <button @click.prevent="rotateRight">
        <FontAwesomeIcon :icon="faArrowRotateRight" />
      </button>
      <button type="button" @click="openBlockDesigner">
        <FontAwesomeIcon :icon="faPenRuler" />Open Block Designer
      </button>
    </div>
  </form>
</template>

<style scoped>
.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
