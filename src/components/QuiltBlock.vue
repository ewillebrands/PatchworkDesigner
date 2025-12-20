<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBlockDesignsStore } from '@/stores/blockdesigns'
import type { blockDesign, block } from './_types'
import { vOnClickOutside } from '@vueuse/components'

defineProps<{
  quiltBlock: block
}>()

const blockDesignMap = ref<Record<string, blockDesign>>({})
const blockDesignsStore = useBlockDesignsStore()

onMounted(() => {
  blockDesignMap.value = Object.fromEntries(
    blockDesignsStore.getAll.map((design) => [design.name, design]),
  )
})

const emit = defineEmits(['blockSelected'])

const selected = ref(false)

const selectBlock = () => {
  selected.value = true
  emit('blockSelected')
}
const unselectBlock = () => {
  selected.value = false
}
</script>

<template>
  <component
    :key="quiltBlock.position.row + '.' + quiltBlock.position.col"
    :is="blockDesignMap[quiltBlock.design]?.component"
    :fabrics="blockDesignMap[quiltBlock.design]?.fabrics"
    :class="selected ? 'block selected' : 'block'"
    @click.stop="selectBlock"
    v-on-click-outside="unselectBlock"
    :style="{
      transform: `rotate(${quiltBlock.rotation}deg)`,
    }"
  />
</template>

<style>
.block {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 0;

  &:hover {
    border: 1px solid var(--color-background);
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    z-index: 1;
  }
  &:active {
    border: 4px solid var(--color-primary);
    border-radius: 2px;
    position: relative;
    z-index: 1;
  }
}

.selected {
  outline: 2px solid var(--color-primary-dark);
  outline-offset: 2px;
  outline-style: dotted;
  border: none;
  border-radius: 2px;
  z-index: 2;
}
</style>
