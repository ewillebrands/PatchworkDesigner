<script setup lang="ts">
import type { BlockDesign } from '@/components/_types'
import { computed, watch } from 'vue'
import SideBar from '@/components/SideBar.vue'
import AccordionPanel from '@/components/AccordionPanel.vue'
import BlockFabrics from '@/components/BlockFabrics.vue'
import SelectionFabrics from '@/components/SelectionFabrics.vue'
import GenericBlock from '@/components/GenericBlock.vue'
import { router } from '@/router'
import { useBlockDesignsStore } from '@/stores/blockdesigns'

const props = defineProps<{
  id: string
}>()

const blockDesignsStore = useBlockDesignsStore()

// computed reference into the store; reactive to store changes
const currentBlockDesign = computed<BlockDesign | undefined>(() =>
  blockDesignsStore.getById?.(props.id),
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
const selection = computed(() => blockDesignsStore.selectedPieces)
</script>

<template>
  <div class="canvas-viewer">
    <div v-if="currentBlockDesign">
      <h1>{{ currentBlockDesign.name }}</h1>
      <GenericBlock
        :block="currentBlockDesign"
        :width="currentBlockDesign.width ? `${50 * currentBlockDesign.width}px` : '400px'"
        :height="currentBlockDesign.height ? `${50 * currentBlockDesign.height}px` : '400px'"
        class="outline-patch blockdesign"
        editable
      />
    </div>
  </div>
  <SideBar title="Toolbox">
    <AccordionPanel v-if="currentBlockDesign" :title="`${currentBlockDesign?.name} Fabrics`">
      <BlockFabrics :blockDesignId="currentBlockDesign.id" />
    </AccordionPanel>
    <AccordionPanel v-if="currentBlockDesign && selection.length > 0" title="Selection Fabrics">
      <SelectionFabrics :blockDesignId="currentBlockDesign.id" />
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
