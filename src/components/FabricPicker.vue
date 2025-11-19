<script setup lang="ts">
import type { fabric } from './_types'
import { ref, onMounted } from 'vue'
import QuiltprojectService from '@/services/QuiltprojectService'

const props = defineProps<{
  anchor: string
  id: string
}>()

const emit = defineEmits(['fabricPicked'])

const fabricsCollection = ref<fabric[]>([])

onMounted(async () => {
  const response = await QuiltprojectService.getFabricsCollection()
  fabricsCollection.value = response.data
})
</script>

<template>
  <div popover :anchor="props.anchor" :id="props.id" class="fabricpicker">
    <div class="fabricpicker__title">Choose a fabric:</div>
    <menu class="fabricslist" v-if="fabricsCollection.length">
      <li
        class="fabric"
        v-for="(fabric, index) in fabricsCollection"
        :key="index"
        @click="emit('fabricPicked', fabric.name)"
      >
        <div class="swatch" :style="{ backgroundColor: `${fabric.color}` }"></div>
        <div>{{ fabric.name }}</div>
      </li>
    </menu>
    <div v-else>Loading fabrics…</div>
  </div>
</template>

<style scoped>
.fabricpicker {
  flex-direction: column;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  gap: 0.5rem;
  border: 1px solid var(--color-input-border);
  border-radius: 0.5rem 0 0.5rem 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  width: 200px;
  position: fixed;
  left: calc(100vw - 37rem);
  top: 4rem;
}

@media (min-width: 1217px) {
  .fabricpicker {
    left: calc(100vw - 49rem);
  }
}

@supports (left: anchor(right)) {
  .fabricpicker:popover-open {
    position: fixed;
    left: anchor(right);
    top: anchor(top);
    margin-left: -15rem;
    margin-top: 2.5rem;
  }
}

.fabricpicker__title {
  font-weight: bold;
  padding: 0.5rem;
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
