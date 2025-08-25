<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['fabricSelected'])

const fabricsCollection = ref([
  { name: 'white', color: 'var(--color-white-mute)' },
  { name: 'black', color: 'var(--color-black-mute)' },
  { name: 'dusk-light', color: 'var(--color-dusk-light)' },
  { name: 'dusk', color: 'var(--color-dusk)' },
  { name: 'dusk-dark', color: 'var(--color-dusk-dark)' },
  { name: 'dawn-light', color: 'var(--color-dawn-light)' },
  { name: 'dawn', color: 'var(--color-dawn)' },
  { name: 'dawn-dark', color: 'var(--color-dawn-dark)' },
])
</script>

<template>
  <div class="fabrics-palette">
    <h2>Fabrics Collection</h2>
    <div class="swatches">
      <div
        v-for="fabric in fabricsCollection"
        :key="fabric.name"
        class="swatch"
        :style="{ backgroundColor: `${fabric.color}` }"
        :title="fabric.name"
        @click="emit('fabricSelected', fabric.color)"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.swatches {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.swatch {
  width: 80px;
  height: 80px;
  border: 4px solid #ffffff;
  border-radius: 99px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
</style>
