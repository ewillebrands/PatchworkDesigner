<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBlockDesignsStore } from '@/stores/blockdesigns'
import type { BlockDesign, block } from './_types'
import GenericBlock from './GenericBlock.vue'

const props = defineProps<{
  quiltBlock: block
}>()

const blockDesignsStore = useBlockDesignsStore()

const currentBlockDesign = computed<BlockDesign | null>(() => {
  return blockDesignsStore.getByName(props.quiltBlock.design) || null
})

const emit = defineEmits(['blockSelected'])

const selected = ref(false)

const selectBlock = () => {
  selected.value = true
  emit('blockSelected')
}
</script>

<template>
  <GenericBlock
    :key="props.quiltBlock.position.row + '.' + props.quiltBlock.position.col"
    :block="currentBlockDesign"
    :class="selected ? 'block selected' : 'block'"
    @click.stop="selectBlock"
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
