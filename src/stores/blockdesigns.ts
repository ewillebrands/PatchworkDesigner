import { defineStore } from 'pinia'
import type { AtomicBlock, CompoundBlock, BlockDesign } from '../components/_types'
import QuiltprojectService from '@/services/QuiltprojectService.js'
import { nanoid } from 'nanoid'

export const useBlockDesignsStore = defineStore('blockdesigns', {
  state: () => ({
    blockDesigns: [] as BlockDesign[],
    selectedPieces: [] as string[],
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
    getSelectedPieces: (state) => state.selectedPieces,
    getFabricIdsForSelectedPieces: (state) => {
      return (blockDesignId: string) => {
        const fabrics = new Set<string>()
        const block: BlockDesign | undefined = state.blockDesigns.find(
          (design) => design.id === blockDesignId,
        )

        // Recursive function to search the subblock and find patch(es) based on the path
        const getFabricsFromPiece = (piece: BlockDesign, path: string[]) => {
          // Base case: if it's an atomic block, we check the patches
          if (piece.type === 'atomic') {
            // If path length is 1, we want all patches of this atomic block
            if (path.length === 1) {
              piece.patches.forEach((patch) => {
                fabrics.add(patch.fabricId)
              })
              // If path length is greater than 1, we want a specific patch
            } else {
              fabrics.add(piece.patches[parseInt(path[1])].fabricId)
            }
            // Recursive case: if it's a compound block, we need to go deeper
          } else if (piece.type === 'compound') {
            piece.subBlocks.forEach((subBlock) => {
              getFabricsFromPiece(subBlock, path)
            })
          }
        }

        const getPieceFromBlock = (block: BlockDesign, pathId: string): BlockDesign | undefined => {
          if (block.id === pathId) {
            return block
          }
          // If the piece does not match the path, we need to search deeper if it's a compound block
          else if (block.type === 'compound') {
            for (const subBlock of block.subBlocks) {
              const result = getPieceFromBlock(subBlock, pathId)
              if (result) return result
            }
          }
          return undefined
        }

        state.selectedPieces.forEach((pieceId) => {
          const [type, ...path] = pieceId.split(/\./)
          console.log('Finding fabrics for pieceId:', pieceId, 'of type:', type, 'path:', path)

          if (block !== undefined) {
            const foundPiece = getPieceFromBlock(block, path[0])
            if (foundPiece !== undefined) {
              getFabricsFromPiece(foundPiece, path)
            }
          }
        })

        console.log('Fabrics found for selected pieces:', Array.from(fabrics))
        return Array.from(fabrics)
      }
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
      this.blockDesigns.push({ ...design, id: nanoid(16) })
      return this.blockDesigns[this.blockDesigns.length - 1] // return the newly added design with its generated id
    },

    removeBlockDesign(id: string) {
      this.blockDesigns = this.blockDesigns.filter((design) => design.id !== id)
    },

    // Selection management for pieces
    addSelectedPieceId(pieceId: string) {
      this.selectedPieces.push(pieceId)
    },
    subtractSelectedPieceId(pieceId: string) {
      this.selectedPieces = this.selectedPieces.filter((id) => id !== pieceId)
    },
    clearSelectedPieces() {
      this.selectedPieces = []
    },
    setSelectedPieces(pieceIds: string[]) {
      this.selectedPieces = [...new Set(pieceIds)]
    },

    // Change managing functions
    changeBlockDesignFabric(designId: string, oldFabricId: string, newFabricId: string) {
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

    //TODO: function will not work with current data structure, needs to be adapted to use path to find correct patch
    // Simple atomic block, patch 0: path = [0]
    // Simple atomic block, patch 1: path = [1]
    // Compound block, sub-block 2, patch 1: path = [2, 1]
    // Nested compound, sub-block 0 → sub-block 3 → patch 2: path = [0, 3, 2]
    changePatchFabric(designId: string, path: number[], newFabricId: string) {
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
