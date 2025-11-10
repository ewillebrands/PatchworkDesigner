<script setup lang="ts">
import type { blockDesign } from '@/components/_types'
import { onMounted, ref } from 'vue'
import QuiltprojectService from '@/services/QuiltprojectService'
import SideBar from '@/components/SideBar.vue'
import AccordionPanel from '@/components/AccordionPanel.vue'
import BlockFabrics from '@/components/BlockFabrics.vue'
import { router } from '@/router'

const props = defineProps<{
  name: string
}>()

const currentBlockDesign = ref<blockDesign>()

onMounted(async () => {
  QuiltprojectService.getBlockDesignByName(props.name)
    .then((response) => {
      currentBlockDesign.value = response.data
    })
    .catch(() => {
      router.push({ name: 'notfoundwithresource', params: { resource: `Block Design` } })
    })
})
</script>

<template>
  <div class="canvas-viewer">
    <div v-if="currentBlockDesign">
      <h1>{{ currentBlockDesign.name }}</h1>
      <component
        :is="currentBlockDesign.component"
        :fabrics="currentBlockDesign.fabrics"
      ></component>
    </div>
  </div>
  <SideBar title="Toolbox">
    <AccordionPanel :title="`${currentBlockDesign?.name} Fabrics`">
      <BlockFabrics :fabricNames="currentBlockDesign?.fabrics" />
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
