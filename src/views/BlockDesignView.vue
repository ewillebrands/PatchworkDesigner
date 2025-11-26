<script setup lang="ts">
import type { blockDesign } from '@/components/_types'
import { computed, watch } from 'vue'
import SideBar from '@/components/SideBar.vue'
import AccordionPanel from '@/components/AccordionPanel.vue'
import BlockFabrics from '@/components/BlockFabrics.vue'
import { router } from '@/router'
import { useBlockDesignsStore } from '@/stores/blockdesigns'

const props = defineProps<{
  name: string
}>()

const blockDesignsStore = useBlockDesignsStore()

// computed reference into the store; reactive to store changes
const currentBlockDesign = computed<blockDesign | undefined>(() =>
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
</script>

<template>
  <div class="canvas-viewer">
    <div v-if="currentBlockDesign">
      <h1>{{ currentBlockDesign.name }}</h1>
      <component
        :is="currentBlockDesign.component"
        :fabrics="currentBlockDesign.fabrics"
        class="outline-patch"
      ></component>
    </div>
  </div>
  <SideBar title="Toolbox">
    <AccordionPanel :title="`${currentBlockDesign?.name} Fabrics`">
      <BlockFabrics v-if="currentBlockDesign" :blockDesignId="currentBlockDesign.id" />
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
