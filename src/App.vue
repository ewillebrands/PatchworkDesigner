<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <header>
    <RouterLink :to="{ name: 'home' }"><FontAwesomeIcon :icon="faHome" /></RouterLink>
    <h1>Quillit</h1>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 16px;
  gap: 16px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--color-divider);

  h1 {
    font-size: 20px;
    font-weight: 600;
    line-height: 100%;
  }
}
main {
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  min-height: 0;
  align-items: stretch;
  height: 100%;
}
</style>
