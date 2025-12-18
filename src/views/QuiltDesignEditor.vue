<script setup lang="ts">
import { ref, computed } from 'vue'
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
// @ts-expect-error: no type declarations for lodash.clonedeep
import cloneDeep from 'lodash.clonedeep'
import isEqual from 'fast-deep-equal'

const props = defineProps<{
  name: string
}>()

const quiltDesignsStore = useQuiltDesignsStore()

const localCopy = ref(cloneDeep(quiltDesignsStore.getByName(props.name))) // editable
const isEdited = computed(() => !isEqual(localCopy.value, quiltDesignsStore.getByName(props.name)))

// if store is still loading we wait; when loading finished and item missing, route to 404/network
// watch(
//   () => [quiltDesignsStore.isLoading, currentQuiltDesign.value],
//   ([isLoading, design]) => {
//     if (!isLoading && !design) {
//       // not found after store finished loading
//       router.push({ name: 'notfoundwithresource', params: { resource: 'Quilt Design' } })
//     }
//   },
//   { immediate: true },
// )

// const newQuiltDesign = reactive<quiltDesign>({} as quiltDesign)
const selectionName = ref('Quilt')
const selectedBlock = ref<block | null>(null)

//functions to handle updating quilt design from form
// function updateDesign(initialQuiltDesign: initialQuiltDesign) {
//   newQuiltDesign.blockSize = initialQuiltDesign.blockSize
//   newQuiltDesign.border = initialQuiltDesign.border
//   newQuiltDesign.binding = initialQuiltDesign.binding
//   newQuiltDesign.radius = initialQuiltDesign.radius
//   saveQuiltDesign()
// }

//functions to apply block design and rotation changes
function applyBlockDesign(blockPosition: blockPosition, blockdesign: string) {
  const blockID = localCopy.value.blockList.findIndex(
    (b: block) => b.position.row === blockPosition.row && b.position.col === blockPosition.col,
  )
  localCopy.value.blockList[blockID].design = blockdesign
}
function applyBlockRotation(blockPosition: blockPosition, blockrotation: number) {
  console.log('apply rotation triggered', blockPosition, blockrotation)
  const blockID = localCopy.value.blockList.findIndex(
    (b: block) => b.position.row === blockPosition.row && b.position.col === blockPosition.col,
  )
  console.log('found blockID', blockID)
  localCopy.value.blockList[blockID].rotation = blockrotation
}

function applyBorderSize(borderSize: number) {
  localCopy.value.border = borderSize
}

function applyBindingSize(bindingSize: number) {
  localCopy.value.binding = bindingSize
}

function applyBindingRadius(bindingRadius: number) {
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
  quiltDesignsStore.updateQuiltDesign(localCopy.value)
  localCopy.value = cloneDeep(quiltDesignsStore.getByName(props.name))
}
</script>

<template>
  <div class="canvas-viewer" @click="selectQuilt">
    <QuiltDesignViewer
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
