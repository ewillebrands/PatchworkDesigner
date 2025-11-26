<script setup lang="ts">
import { computed } from 'vue'
import type { fabric } from './_types'
import FabricPicker from './FabricPicker.vue'

const emit = defineEmits(['fabricChanged', 'fabricSelected'])
const props = defineProps<{
  fabrics: fabric[]
  editable?: boolean
  deduplicated?: boolean
}>()

const changeFabric = (oldFabric: number, newFabric: number) => {
  emit('fabricChanged', { oldFabric, newFabric })
  console.log('Emitted fabric change', oldFabric, newFabric)
}

// simplified, reactive dedupe assuming every fabric has a numeric id
const visibleFabrics = computed(() => {
  const allFabrics = props.fabrics ?? []
  if (!props.deduplicated) return allFabrics

  const seen = new Set<number>()
  const out: fabric[] = []
  for (const f of allFabrics) {
    if (seen.has(f.id)) continue
    seen.add(f.id)
    out.push(f)
  }
  return out
})
</script>

<template>
  <div v-if="visibleFabrics.length">
    <div class="swatches" v-if="editable">
      <div v-for="(fabric, index) in visibleFabrics" :key="index">
        <button
          :popovertarget="`fabric-picker-${fabric.name}`"
          class="swatch"
          :style="{ backgroundColor: `${fabric.color}` }"
          :title="fabric.name"
          :id="fabric.name"
        ></button>
        <FabricPicker
          :anchor="fabric.name"
          :id="`fabric-picker-${fabric.name}`"
          @fabricPicked="changeFabric(fabric.id, $event)"
        />
      </div>
    </div>
    <div class="swatches" v-else>
      <div
        v-for="(fabric, index) in visibleFabrics"
        :key="index"
        class="swatch"
        :style="{ backgroundColor: `${fabric.color}` }"
        :title="fabric.name"
        @click="emit('fabricSelected', fabric.color)"
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
