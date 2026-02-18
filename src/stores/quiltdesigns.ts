import { defineStore } from 'pinia'
import type { quiltDesign } from '../components/_types'
import { useId } from 'vue'

export const useQuiltDesignsStore = defineStore('quiltdesigns', {
  state: () => ({
    quiltDesigns: [] as quiltDesign[],
    isLoading: false,
    error: null as Error | null,
  }),
  getters: {
    getAll: (state) => state.quiltDesigns,
    getById: (state) => {
      return (id: string) => state.quiltDesigns.find((design) => design.id === id)
    },
    getByName: (state) => {
      return (name: string) => state.quiltDesigns.find((design) => design.name === name)
    },
    // Boolean getter (case-insensitive) to check existence by name
    existsByName: (state) => {
      return (name: string) =>
        state.quiltDesigns.some((design) => design.name.toLowerCase() === name.trim().toLowerCase())
    },
  },
  actions: {
    addQuiltDesign(design: quiltDesign) {
      this.quiltDesigns.push({ ...design, id: useId() })
    },
    updateQuiltDesign(updatedDesign: quiltDesign) {
      const index = this.quiltDesigns.findIndex((design) => design.id === updatedDesign.id)
      this.quiltDesigns[index] = updatedDesign
    },
    removeQuiltDesign(id: string) {
      this.quiltDesigns = this.quiltDesigns.filter((design) => design.id !== id)
    },
  },
})
