<script setup lang="ts">
import { computed } from 'vue'
import { useFabricsStore } from '@/stores/fabrics'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'

const fabricsStore = useFabricsStore()
const fabrics = computed(() => fabricsStore.getAll)

function handleFabricColorChange(fabricId: string, color: string) {
  fabricsStore.updateFabricColor(fabricId, color)
}
</script>

<template>
  <div class="welcome">
    <div class="header">
      <h2>Your Fabrics Collection</h2>
      <button @click="fabricsStore.addFabric({ name: 'New Fabric', color: '#ffffff' })">
        <FontAwesomeIcon :icon="faPlus" /> Add Fabric
      </button>
    </div>
    <div class="list">
      <div v-for="fabric in fabrics" :key="fabric.id" class="item">
        <input
          :id="`fabric-${fabric.id}`"
          type="color"
          :value="fabric.color"
          @input="handleFabricColorChange(fabric.id, ($event.target as HTMLInputElement).value)"
        />
        <label :for="`fabric-${fabric.id}`">{{ fabric.name }}</label>
        <button aria-label="Rename Fabric" @click="makeNameEditable">
          <FontAwesomeIcon :icon="faPencil" />
        </button>
        <button aria-label="Remove Fabric" @click="fabricsStore.removeFabric(fabric.id)">
          <FontAwesomeIcon :icon="faTrash" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome {
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}
h2 {
  margin: 0;
}
.header {
  display: flex;
  gap: 2rem;
  align-items: center;
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
