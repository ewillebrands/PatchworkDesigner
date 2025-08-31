<script setup lang="ts">
import { ref } from 'vue'

//object for mapping formfields to block properties
const formFields = ref({
  blockDesign: 1,
})
</script>
<template>
  <form action="">
    <div class="field">
      <label for="blockdesign">Design</label>
      <select v-model="formFields.blockDesign" name="blockdesign" id="blockdesign">
        <option value="1">Plain patch</option>
        <option value="2">Half square triangle</option>
        <option value="3">Four patch</option>
        <option value="4">Nine patch</option>
      </select>
    </div>
  </form>
</template>
