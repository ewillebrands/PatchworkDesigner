import PlainPatch from './blocktemplates/PlainPatch.vue'
import HalfSquareTriangle from './blocktemplates/HalfSquareTriangle.vue'

export interface quilt {
  columns: number
  rows: number
  blockList: block[]
  blockSize: number
  border: number
  binding: number
  radius: number
}
export interface block {
  design: BlockDesign
  position: [number, number]
  rotation?: [number]
}

export interface BlockDesign {
  id: number
  name: string
  component: typeof PlainPatch | typeof HalfSquareTriangle | string
  fabrics: string[]
}
