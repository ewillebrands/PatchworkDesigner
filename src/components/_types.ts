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

export interface initialQuiltDesign {
  columns: number
  rows: number
  arrangement: string
  blockSize: number
  border: number
  binding: number
  radius: number
}

export interface block {
  design: string // should match one of the BlockDesign.name values
  position: blockPosition
  rotation?: number // in degrees, e.g., 0, 90, 180, 270
}

export interface blockPosition {
  row: number
  col: number
}

export interface BlockDesign {
  id: number
  name: string
  component: typeof PlainPatch | typeof HalfSquareTriangle | string
  fabrics: string[]
}
