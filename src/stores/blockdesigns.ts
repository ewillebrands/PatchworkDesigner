import { defineStore } from 'pinia'
import type { blockDesign } from '../components/_types'
import QuiltprojectService from '@/services/QuiltprojectService.js'

export const useBlockDesignsStore = defineStore('blockdesigns', {
  state: () => ({
    blockDesigns: [] as blockDesign[],
    isLoading: false,
    error: null as Error | null,
    highestId: 0,
  }),
  getters: {
    getAll: (state) => state.blockDesigns,
    getById: (state) => {
      return (id: number) => state.blockDesigns.find((design) => design.id === id)
    },
    getByName: (state) => {
      return (name: string) => state.blockDesigns.find((design) => design.name === name)
    },
  },
  actions: {
    // populate store from database
    async fetchAll() {
      this.isLoading = true
      this.error = null
      try {
        const response = await QuiltprojectService.getBlockDesigns()
        this.blockDesigns = response.data
        const ids = this.blockDesigns.map((f: blockDesign) => f.id)
        this.highestId = ids.length ? Math.max(...ids) + 1 : 0
      } catch (err) {
        this.error = err as Error
        console.error('fetchAll block designs failed', err)
      } finally {
        this.isLoading = false
      }
    },
    addBlockDesign(design: blockDesign) {
      this.blockDesigns.push({ ...design, id: this.highestId++ })
    },
    removeBlockDesign(id: number) {
      this.blockDesigns = this.blockDesigns.filter((design) => design.id !== id)
    },

    changeBlockDesignFabric(designId: number, oldFabricId: number, newFabricId: number) {
      const design = this.blockDesigns.find((d) => d.id === designId)
      if (design) {
        console.log('Old fabrics for BlockDesign', design.fabrics)
        design.fabrics = design.fabrics.map((fabricId) =>
          fabricId === oldFabricId ? newFabricId : fabricId,
        )
        console.log('New fabrics for BlockDesign', design.fabrics)
      }
    },
    changeBlockDesignFabricByIndex(designId: number, oldFabricIndex: number, newFabricId: number) {
      const design = this.blockDesigns.find((d) => d.id === designId)
      if (design) {
        console.log('Old fabrics for BlockDesign', design.fabrics)
        design.fabrics.splice(oldFabricIndex, 1, newFabricId)
        console.log('New fabrics for BlockDesign', design.fabrics)
      }
    },
  },
})
