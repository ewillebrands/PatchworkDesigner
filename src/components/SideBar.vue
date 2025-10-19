<template>
  <aside :class="{ sidebar: showSidebar, 'floating-button': !showSidebar }">
    <button class="sidebar-header" @click="showSidebar = !showSidebar">
      {{ title }}
      <FontAwesomeIcon
        class="transition"
        :icon="showSidebar ? faTimes : faPlus"
        :rotation="!showSidebar ? undefined : '180'"
      />
    </button>
    <transition name="sidebar-grow">
      <slot v-if="showSidebar" />
    </transition>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

defineProps<{
  title: string
}>()

const showSidebar = ref(false)
</script>

<style scoped>
.transition {
  transition: 0.5s;
}

.sidebar-grow-enter-active,
.sidebar-grow-leave-active {
  transition:
    transform 0.3s cubic-bezier(0.55, 0, 0.1, 1),
    opacity 0.3s;
  transform-origin: top right;
}
.sidebar-grow-enter-from,
.sidebar-grow-leave-to {
  transform: scaleY(0.2) scaleX(0.2);
  opacity: 0;
}
.sidebar-grow-enter-to,
.sidebar-grow-leave-from {
  transform: scaleY(1) scaleX(1);
  opacity: 1;
}

.sidebar {
  height: 100%;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: var(--color-background-soft);
  width: 36rem;
  padding: 0 1rem 1rem 1rem;
  border-left: 1px solid var(--color-divider);
}
@media screen and (max-width: 1216px) {
  .sidebar {
    width: 24rem;
  }
}

.floating-button {
  position: relative;
  top: 0.5rem;
  right: 0.5rem;
  height: 3rem;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-divider);
  border-radius: 0.5rem;
  padding: 0 0.75rem;
  z-index: 1000;
}
.sidebar-header {
  display: flex;
  gap: 0.5rem;
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
  padding: 0.5rem 0;
}
</style>
