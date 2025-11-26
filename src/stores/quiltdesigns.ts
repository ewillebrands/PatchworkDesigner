import { defineStore } from 'pinia'
import type { quiltDesign } from '../components/_types'

export const useQuiltDesignsStore = defineStore('quiltdesigns', {
  state: () => ({
    quiltDesigns: [] as quiltDesign[],
    isLoading: false,
    error: null as Error | null,
    highestId: 0,
  }),
  getters: {
    getAll: (state) => state.quiltDesigns,
    getById: (state) => {
      return (id: number) => state.quiltDesigns.find((design) => design.id === id)
    },
    getByName: (state) => {
      return (name: string) => state.quiltDesigns.find((design) => design.name === name)
    },
  },
  actions: {
    // populate store from database
    addQuiltDesign(design: quiltDesign) {
      this.quiltDesigns.push({ ...design, id: this.highestId++ })
    },
    removeQuiltDesign(id: number) {
      this.quiltDesigns = this.quiltDesigns.filter((design) => design.id !== id)
    },
  },
})
