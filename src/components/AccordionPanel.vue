<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const showPanel = ref(false)
</script>

<template>
  <div class="accordion-panel">
    <button class="accordion-header" @click="showPanel = !showPanel">
      {{ title }}<i class="fas fa-angle-down"></i>
    </button>
    <div v-if="showPanel" class="accordion-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
i {
  animation-duration: 0.5s;
}
.accordion-panel {
  border: solid var(--color-input-border);
  border-width: 2px 0;
}
.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  color: var(--color-primary);
  font-size: 1.25rem;
  font-weight: bold;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  padding: 0.75rem 1rem;
}
.accordion-content {
  padding: 0 1rem 1rem 1rem;
}
</style>
