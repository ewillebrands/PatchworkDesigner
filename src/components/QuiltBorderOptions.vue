<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['applyBorderSize'])

//object for mapping formfields to quilt properties
const formFields = ref({
  border: 0,
})
</script>

<template>
  <form action="">
    <div class="field">
      <label for="border">Border in inches</label>
      <input
        v-model="formFields.border"
        type="number"
        id="border"
        name="border"
        min="0"
        max="20"
        @change="emit('applyBorderSize', formFields.border)"
      />
    </div>
  </form>
</template>
