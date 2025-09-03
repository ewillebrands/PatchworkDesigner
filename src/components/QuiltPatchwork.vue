<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { quilt } from './_types'
import QuiltprojectService from '@/services/QuiltprojectService'
import type { BlockDesign } from './_types'

defineProps<{
  quiltDesign: quilt
}>()

const emit = defineEmits(['blockSelected', 'quiltSelected'])

const blockDesignMap = ref<Record<string, BlockDesign>>({})
onMounted(async () => {
  const response = await QuiltprojectService.getBlockDesigns()
  // Create a map for quick lookup by name
  blockDesignMap.value = Object.fromEntries(response.data.map((design) => [design.name, design]))
})
</script>

<template>
  <div
    v-if="quiltDesign.blockList.length > 0"
    class="patchwork"
    :style="{
      gridTemplateColumns: `repeat(${quiltDesign.columns}, 1fr)`,
      gridTemplateRows: `repeat(${quiltDesign.rows}, 1fr)`,
      border: `${10 * quiltDesign.border}px solid rgb(5, 97, 154)`,
      borderRadius: `${10 * quiltDesign.radius}px`,
      outline: `${10 * quiltDesign.binding}px solid hotpink`,
    }"
    @click="emit('quiltSelected')"
  >
    <component
      v-for="(block, index) in quiltDesign.blockList"
      :key="index"
      :is="blockDesignMap[block.design]?.component"
      :fabrics="blockDesignMap[block.design]?.fabrics"
      class="block"
      @click.stop="emit('blockSelected', block)"
      :style="{
        width: `${10 * quiltDesign.blockSize}px`,
        height: `${10 * quiltDesign.blockSize}px`,
      }"
    />
  </div>
</template>

<style scoped>
.patchwork {
  display: grid;
  margin: 20px;
}
.block {
  &:hover {
    outline: 4px solid var(--color-primary);
    border: 4px solid var(--color-background);
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    z-index: 99;
  }
}
</style>
