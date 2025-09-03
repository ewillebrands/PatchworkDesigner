import type { Component } from 'vue'
import PlainPatch from './PlainPatch.vue'
import HalfSquareTriangle from './HalfSquareTriangle.vue'
// import other components as needed

const componentMap: Record<string, Component> = {
  PlainPatch,
  HalfSquareTriangle,
  // Add more mappings as needed
}

export default componentMap
