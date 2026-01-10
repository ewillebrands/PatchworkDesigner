<script setup lang="ts">
import type { BlockDesign } from '@/components/_types'
import { ref, computed, watch } from 'vue'
import SideBar from '@/components/SideBar.vue'
import AccordionPanel from '@/components/AccordionPanel.vue'
import BlockFabrics from '@/components/BlockFabrics.vue'
import PatchFabric from '@/components/PatchFabric.vue'
import GenericBlock from '@/components/GenericBlock.vue'
import { router } from '@/router'
import { useBlockDesignsStore } from '@/stores/blockdesigns'

const props = defineProps<{
  name: string
}>()

const blockDesignsStore = useBlockDesignsStore()

// computed reference into the store; reactive to store changes
const currentBlockDesign = computed<BlockDesign | undefined>(() =>
  blockDesignsStore.getByName?.(props.name),
)

// if store is still loading we wait; when loading finished and item missing, route to 404/network
watch(
  () => [blockDesignsStore.isLoading, currentBlockDesign.value],
  ([isLoading, design]) => {
    if (!isLoading && !design) {
      // not found after store finished loading
      router.push({ name: 'notfoundwithresource', params: { resource: 'Block Design' } })
    }
  },
  { immediate: true },
)
const selectedPatch = ref<number | null>(null)

function deselectPatch() {
  selectedPatch.value = null
}
</script>

<template>
  <div class="canvas-viewer" @click.self="deselectPatch">
    <div v-if="currentBlockDesign">
      <h1>{{ currentBlockDesign.name }}</h1>
      <GenericBlock
        :block="currentBlockDesign"
        class="outline-patch blockdesign"
        editable
        @patchSelected="(patch: number) => (selectedPatch = patch)"
      />
    </div>
  </div>
  <SideBar title="Toolbox">
    <AccordionPanel
      v-if="currentBlockDesign && selectedPatch === null"
      :title="`${currentBlockDesign?.name} Fabrics`"
    >
      <BlockFabrics :blockDesignId="currentBlockDesign.id" />
    </AccordionPanel>
    <AccordionPanel
      v-if="currentBlockDesign && selectedPatch !== null"
      :title="`Selected Patch ${selectedPatch} Fabric`"
    >
      <PatchFabric :blockDesignId="currentBlockDesign.id" :patch="selectedPatch" />
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
