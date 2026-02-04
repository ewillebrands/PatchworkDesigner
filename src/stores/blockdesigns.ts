import { defineStore } from 'pinia'
import type { AtomicBlock, CompoundBlock, BlockDesign } from '../components/_types'
import QuiltprojectService from '@/services/QuiltprojectService.js'
import { useId } from 'vue'

export const useBlockDesignsStore = defineStore('blockdesigns', {
  state: () => ({
    blockDesigns: [] as BlockDesign[],
    isLoading: false,
    error: null as Error | null,
  }),
  getters: {
    getAll: (state) => state.blockDesigns,
    getById: (state) => {
      return (id: string) => state.blockDesigns.find((design) => design.id === id)
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
      } catch (err) {
        this.error = err as Error
        console.error('fetchAll block designs failed', err)
      } finally {
        this.isLoading = false
      }
    },
    addBlockDesign(design: Omit<AtomicBlock, 'id'> | Omit<CompoundBlock, 'id'>) {
      const newBlockId = useId()
      this.blockDesigns.push({ ...design, id: newBlockId } as BlockDesign)
    },
    removeBlockDesign(id: string) {
      this.blockDesigns = this.blockDesigns.filter((design) => design.id !== id)
    },

    changeBlockDesignFabric(designId: string, oldFabricId: number, newFabricId: number) {
      const design = this.blockDesigns.find((d) => d.id === designId)
      if (!design) return

      // Recursive function to change fabricId in all patches
      const replaceFabricInBlock = (block: BlockDesign) => {
        if (block.type === 'atomic') {
          // Atomic block: update fabricId in all patches
          block.patches.forEach((patch) => {
            if (patch.fabricId === oldFabricId) {
              patch.fabricId = newFabricId
            }
          })
        } else if (block.type === 'compound') {
          // Compound block: recursively process each sub-block
          block.subBlocks.forEach((subBlock) => {
            replaceFabricInBlock(subBlock)
          })
        }
      }

      replaceFabricInBlock(design)
    },

    // Simple atomic block, patch 0: path = [0]
    // Simple atomic block, patch 1: path = [1]
    // Compound block, sub-block 2, patch 1: path = [2, 1]
    // Nested compound, sub-block 0 → sub-block 3 → patch 2: path = [0, 3, 2]
    changePatchFabric(designId: string, path: number[], newFabricId: number) {
      const design = this.blockDesigns.find((d) => d.id === designId)
      if (!design) return

      // Navigate through the path to find the target patch
      let currentBlock: BlockDesign = design

      // Follow path through compound blocks (all indices except last)
      for (let i = 0; i < path.length - 1; i++) {
        if (currentBlock.type === 'compound') {
          currentBlock = currentBlock.subBlocks[path[i]]
        } else {
          console.error('Invalid path: expected compound block')
          return
        }
      }

      // Last index is the patch index in the atomic block
      if (currentBlock.type === 'atomic') {
        const patchIndex = path[path.length - 1]
        if (currentBlock.patches[patchIndex]) {
          currentBlock.patches[patchIndex].fabricId = newFabricId
        }
      } else {
        console.error('Invalid path: final block must be atomic')
      }
    },
  },
})
