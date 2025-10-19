<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

defineProps<{
  title: string
}>()

const showPanel = ref(false)
</script>

<template>
  <div class="accordion-panel">
    <button class="accordion-header" @click="showPanel = !showPanel">
      {{ title }}
      <FontAwesomeIcon
        class="transition"
        :icon="faAngleUp"
        :rotation="showPanel ? undefined : '180'"
      />
    </button>
    <div v-if="showPanel" class="accordion-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.transition {
  transition: 0.5s;
}
.accordion-panel {
  border-top: 1px solid var(--color-divider);

  &:last-child {
    border-bottom: 1px solid var(--color-divider);
  }
}
.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: bold;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  padding: 0.5rem 0;
}
.accordion-content {
  padding-bottom: 1rem;
}
</style>
