<script setup lang="ts">
import { computed } from 'vue'
import { useFabricsStore } from '@/stores/fabrics'

const fabricsStore = useFabricsStore()
const fabrics = computed(() => fabricsStore.getAll)

function handleFabricColorChange(fabricId: string, color: string) {
  fabricsStore.updateFabricColor(fabricId, color)
}
</script>

<template>
  <div class="welcome">
    <h2>Your Fabrics Collection</h2>
    <div class="list">
      <div v-for="fabric in fabrics" :key="fabric.id" class="item">
        <input
          :id="`fabric-${fabric.id}`"
          type="color"
          :value="fabric.color"
          @input="handleFabricColorChange(fabric.id, ($event.target as HTMLInputElement).value)"
        />
        <label :for="`fabric-${fabric.id}`">{{ fabric.name }}</label>
      </div>
    </div>
  </div>
</template>

<style>
.welcome {
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
label {
  font-weight: 500;
  flex-grow: 1;
}
input {
  width: 3rem;
  height: 3rem;
  border-radius: 0.25rem;
  border: none;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
}
input::-webkit-color-swatch-wrapper {
  padding: 0;
}
input::-webkit-color-swatch {
  border: none;
}
</style>
