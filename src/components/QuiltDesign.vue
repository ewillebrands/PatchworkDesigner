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
  <p v-if="quiltDesign.blockList.length === 0">
    Please use Quilt setup on the right to start your quilt design.
  </p>
  <div
    v-if="quiltDesign.blockList.length > 0"
    class="quilt"
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
        transform: `rotate(${block.rotation}deg)`,
      }"
    />
  </div>
</template>

<style scoped>
.quilt {
  display: grid;
  margin: 400px;
}
.block:hover:not(:active) {
  outline: 2px solid var(--color-primary);
  border: 2px solid var(--color-background);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  z-index: 50;
}
.block:active {
  outline: 2px solid var(--color-background);
  outline-offset: 2px;
  border: 2px solid var(--color-primary);
  z-index: 50;
}
</style>
