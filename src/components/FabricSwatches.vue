<script setup lang="ts">
import type { fabric } from './_types'
import FabricPicker from './FabricPicker.vue'

const emit = defineEmits(['fabricChanged', 'fabricSelected'])
defineProps<{
  fabrics: fabric[]
  editable?: boolean
}>()
</script>

<template>
  <div v-if="fabrics.length">
    <div class="swatches" v-if="editable">
      <div v-for="(fabric, index) in fabrics" :key="index">
        <button
          :popovertarget="`fabric-picker-${fabric.name}`"
          class="swatch"
          :style="{ backgroundColor: `${fabric.color}` }"
          :title="fabric.name"
          :id="fabric.name"
        ></button>
        <FabricPicker :anchor="fabric.name" :id="`fabric-picker-${fabric.name}`" />
      </div>
    </div>
    <div class="swatches" v-else>
      <div
        v-for="(fabric, index) in fabrics"
        :key="index"
        class="swatch"
        :style="{ backgroundColor: `${fabric.color}` }"
        :title="fabric.name"
        @click="emit('fabricSelected', fabric.color)"
        @fabricPicked="(newFabric: number) => emit('fabricChanged', fabric.id, newFabric)"
      ></div>
    </div>
  </div>
  <div v-else>Loading fabrics…</div>
</template>

<style scoped>
.swatches {
  position: relative;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.swatch {
  width: 5rem;
  height: 5rem;
  border: 0.25rem solid #ffffff;
  border-radius: 99px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
</style>
