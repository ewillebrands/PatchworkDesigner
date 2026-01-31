<script setup lang="ts">
import NewQuiltDesignDialog from '@/components/NewQuiltDesignDialog.vue'
import { useQuiltDesignsStore } from '@/stores/quiltdesigns'
import { computed } from 'vue'
import BlockDesigns from '@/components/BlockDesigns.vue'
import FabricsCollection from '@/components/FabricsCollection.vue'
import QuiltDesignViewer from '@/components/QuiltDesignViewer.vue'

const quiltDesignsStore = useQuiltDesignsStore()

const quiltDesigns = computed(() => quiltDesignsStore.getAll)
</script>

<template>
  <div class="welcome">
    <h2>Welcome to Quillit!</h2>
    <new-quilt-design-dialog />
    <h2 v-if="quiltDesigns.length > 0">Your Quilt Designs</h2>
    <div class="quilt-thumbnails">
      <router-link
        v-for="design in quiltDesigns"
        :key="design.id"
        :to="{ name: 'quiltdesign', params: { name: design.name } }"
        class="quilt-thumbnail"
      >
        <quilt-design-viewer :current-quilt-design="design" :asThumbnailOfHeight="80" />
        <span>{{ design.name }}</span>
      </router-link>
    </div>
    <h2>Your Block Designs</h2>
    <BlockDesigns />
    <h2>Your Fabrics Collection</h2>
    <FabricsCollection />
  </div>
</template>

<style>
.welcome {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 32px;
}
.quilt-thumbnails {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.quilt-thumbnail {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  text-decoration: none;
  color: inherit;
  margin: 16px;
}
</style>
