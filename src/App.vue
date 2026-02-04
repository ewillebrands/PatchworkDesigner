<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { useFabricsStore } from './stores/fabrics'
import { useBlockDesignsStore } from './stores/blockdesigns'

const fabricsStore = useFabricsStore()
const blockDesignsStore = useBlockDesignsStore()
onMounted(async () => {
  await Promise.all([fabricsStore.fetchAll(), blockDesignsStore.fetchAll()])
  // now stores are populated (or errored)
  console.log(
    'stores loaded: ',
    fabricsStore.fabrics.length,
    ' fabrics and ',
    blockDesignsStore.blockDesigns.length,
    ' block designs',
  )
  console.log('blockDesigns:', blockDesignsStore.blockDesigns)
  if (fabricsStore.error) console.error('fabrics error:', fabricsStore.error)
  if (blockDesignsStore.error) console.error('block designs error:', blockDesignsStore.error)
})
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
  justify-items: stretch;
}
</style>
