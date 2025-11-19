<script setup lang="ts">
import type { fabric } from './_types'
import { ref, onMounted } from 'vue'
import QuiltprojectService from '@/services/QuiltprojectService'

const emit = defineEmits(['fabricPicked'])

const fabricsCollection = ref<fabric[]>([])

onMounted(async () => {
  const response = await QuiltprojectService.getFabricsCollection()
  fabricsCollection.value = response.data
})
</script>

<template>
  <div popover class="fabricpicker" id="fabric-picker">
    <span>Choose a fabric:</span>
    <menu class="fabricslist" v-if="fabricsCollection.length">
      <li
        class="fabric"
        v-for="(fabric, index) in fabricsCollection"
        :key="index"
        @click="emit('fabricPicked', fabric.name)"
      >
        <div class="swatch" :style="{ backgroundColor: `${fabric.color}` }"></div>
        <span>{{ fabric.name }}</span>
      </li>
    </menu>
    <div v-else>Loading fabrics…</div>
  </div>
</template>

<style scoped>
.fabricpicker {
  display: relative;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid var(--color-input-border);
  border-radius: 0.25rem;
  max-height: 300px;
  overflow-y: auto;
  width: 200px;
}
.fabricslist {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.fabric {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0.5rem 0.25rem;
  border-top: 1px solid var(--color-divider);
  align-items: center;
  font-size: 0.9rem;
  color: #333333;
  cursor: pointer;
  &:hover {
    background-color: var(--color-background-mute);
  }
}

.swatch {
  width: 1.5rem;
  height: 1.5rem;
  border: 0.5px solid var(--color-input-border);
  border-radius: 4px;
}
</style>
