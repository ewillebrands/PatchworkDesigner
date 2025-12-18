<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['applyBindingSize', 'applyBindingRadius'])

//object for mapping formfields to quilt properties
const formFields = ref({
  binding: 0,
  radius: 0,
})
</script>

<template>
  <form action="">
    <div class="field">
      <label for="binding">Binding in inches</label>
      <input
        v-model="formFields.binding"
        type="number"
        id="binding"
        name="binding"
        step="0.125"
        min="0"
        max="2"
        @change="emit('applyBindingSize', formFields.binding)"
      />
    </div>
    <div class="field">
      <label for="radius">Corner radius in inches</label>
      <input
        v-model="formFields.radius"
        type="number"
        id="radius"
        name="radius"
        min="0"
        max="20"
        @change="emit('applyBindingRadius', formFields.radius)"
      />
    </div>
  </form>
</template>
