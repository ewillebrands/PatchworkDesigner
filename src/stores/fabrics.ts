import { defineStore } from 'pinia'
import QuiltprojectService from '@/services/QuiltprojectService.js'
import type { fabric } from '../components/_types'

export const useFabricsStore = defineStore('fabrics', {
  state: () => ({
    fabrics: [] as fabric[],
    isLoading: false,
    error: null as Error | null,
    highestId: 0,
  }),
  getters: {
    getAll: (state) => state.fabrics,
    getById: (state) => {
      return (id: number) => state.fabrics.find((fabric) => fabric.id === id)
    },
    getByName: (state) => {
      return (name: string) => state.fabrics.find((fabric) => fabric.name === name)
    },
  },
  actions: {
    // populate store from database
    async fetchAll() {
      this.isLoading = true
      this.error = null
      try {
        const response = await QuiltprojectService.getFabricsCollection()
        this.fabrics = response.data
        const ids = this.fabrics.map((f: fabric) => f.id)
        this.highestId = ids.length ? Math.max(...ids) + 1 : 0
      } catch (err) {
        this.error = err as Error
        console.error('fetchAll fabrics failed', err)
      } finally {
        this.isLoading = false
      }
    },
    addFabric(fabric: fabric) {
      this.fabrics.push({ ...fabric, id: this.highestId++ })
    },
    removeFabric(fabricId: number) {
      this.fabrics = this.fabrics.filter((fabric) => fabric.id !== fabricId)
    },
  },
})
