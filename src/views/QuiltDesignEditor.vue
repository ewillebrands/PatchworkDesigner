<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { block, blockPosition } from '../components/_types'
import QuiltDesignViewer from '../components/QuiltDesignViewer.vue'
import QuiltBorderOptions from '../components/QuiltBorderOptions.vue'
import QuiltBindingOptions from '../components/QuiltBindingOptions.vue'
import FabricsCollection from '../components/FabricsCollection.vue'
import BlockDesigns from '../components/BlockDesigns.vue'
import AccordionPanel from '../components/AccordionPanel.vue'
import BlockOptions from '../components/BlockOptions.vue'
import SideBar from '../components/SideBar.vue'
import { useQuiltDesignsStore } from '@/stores/quiltdesigns'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'fast-deep-equal'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: string
}>()

const quiltDesignsStore = useQuiltDesignsStore()
const router = useRouter()

const localCopy = ref(cloneDeep(quiltDesignsStore.getById(props.id))) // editable
const isEdited = computed(() => !isEqual(localCopy.value, quiltDesignsStore.getById(props.id)))

// if store is still loading we wait; when loading finished and item missing, route to 404/network
watch(
  () => [quiltDesignsStore.isLoading, localCopy.value],
  ([isLoading, design]) => {
    if (!isLoading && !design) {
      // not found after store finished loading
      router.push({ name: 'notfoundwithresource', params: { resource: 'Quilt Design' } })
    }
  },
  { immediate: true },
)

const selectionName = ref('Quilt')
const selectedBlock = ref<block | null>(null)

//functions to apply block design and rotation changes
function applyBlockDesign(blockPosition: blockPosition, blockdesignId: string) {
  if (!localCopy.value) return
  const blockIndex = localCopy.value.blockList.findIndex(
    (b: block) => b.position.row === blockPosition.row && b.position.col === blockPosition.col,
  )
  if (blockIndex !== undefined && blockIndex !== -1) {
    localCopy.value.blockList[blockIndex].designId = blockdesignId
  }
}
function applyBlockRotation(blockPosition: blockPosition, blockrotation: number) {
  if (!localCopy.value) return
  console.log('apply rotation triggered', blockPosition, blockrotation)
  const blockIndex = localCopy.value.blockList.findIndex(
    (b: block) => b.position.row === blockPosition.row && b.position.col === blockPosition.col,
  )
  console.log('found blockIndex', blockIndex)
  localCopy.value.blockList[blockIndex].rotation = blockrotation
}

function applyBorderSize(borderSize: number) {
  if (!localCopy.value) return
  localCopy.value.border = borderSize
}

function applyBindingSize(bindingSize: number) {
  if (!localCopy.value) return
  localCopy.value.binding = bindingSize
}

function applyBindingRadius(bindingRadius: number) {
  if (!localCopy.value) return
  localCopy.value.radius = bindingRadius
}

//TODO function to handle fabric color selection
function printColor(color: string) {
  console.log(color)
}

//functions to handle selection of quilt or block
function selectBlock(block: block) {
  selectionName.value = `Block ${block.position.row}.${block.position.col}`
  selectedBlock.value = block
}

function selectQuilt() {
  selectionName.value = 'Quilt'
  selectedBlock.value = null
}

function saveQuiltDesign() {
  console.log('Saving quilt design')
  if (!localCopy.value) return
  quiltDesignsStore.updateQuiltDesign(localCopy.value)
  localCopy.value = cloneDeep(quiltDesignsStore.getById(props.id))
}
</script>

<template>
  <div class="canvas-viewer" @click="selectQuilt">
    <QuiltDesignViewer
      v-if="localCopy"
      :currentQuiltDesign="localCopy"
      @quiltSelected="selectQuilt"
      @blockSelected="selectBlock"
    />
  </div>
  <SideBar title="Toolbox">
    <button
      style="margin: 0.75rem 0; justify-self: flex-end"
      :disabled="!isEdited"
      @click="saveQuiltDesign"
    >
      Save changes
    </button>
    <AccordionPanel v-if="selectionName.startsWith('Block')" :title="`${selectionName} Options`">
      <BlockOptions
        :selectedBlock="selectedBlock"
        @applyBlockDesign="applyBlockDesign"
        @applyBlockRotation="applyBlockRotation"
      />
    </AccordionPanel>
    <AccordionPanel title="Border"
      ><QuiltBorderOptions @applyBorderSize="applyBorderSize"
    /></AccordionPanel>
    <AccordionPanel title="Binding"
      ><QuiltBindingOptions
        @applyBindingSize="applyBindingSize"
        @applyBindingRadius="applyBindingRadius"
    /></AccordionPanel>
    <AccordionPanel title="Fabrics collection">
      <FabricsCollection @fabricSelected="printColor" />
    </AccordionPanel>
    <AccordionPanel :title="'Block designs'">
      <BlockDesigns />
    </AccordionPanel>
  </SideBar>
</template>

<style scoped>
.canvas-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-grow: 1;
  overflow: auto;
}
</style>
