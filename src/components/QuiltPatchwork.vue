<script setup lang="ts">
import QuiltBlock from './QuiltBlock.vue'
import { ref } from 'vue'

const quilt = ref([{ name: 'block 1' }, { name: 'block 2' }])
</script>

<template>
  <QuiltBlock v-for="blocks in quilt" />
</template>

<style scoped></style>
