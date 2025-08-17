<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    fabrics?: string[]
  }>(),
  {
    fabrics: () => ['#2222aa', '#aa2222'],
  },
)
</script>

<template>
  <div
    class="halfSquareTriangle"
    :style="{
      borderColor: `${props.fabrics[0]} ${props.fabrics[0]} ${props.fabrics[1]} ${props.fabrics[1]}`,
    }"
  ></div>
</template>

<style scoped>
.halfSquareTriangle {
  width: 0;
  height: 0;
  border: solid 50px;
}
</style>
