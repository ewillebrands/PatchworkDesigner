import PlainPatch from './blocktemplates/PlainPatch.vue'
import HalfSquareTriangle from './blocktemplates/HalfSquareTriangle.vue'

export interface quiltDesign {
  id: number
  name: string
  columns: number
  rows: number
  blockList: block[]
  blockSize: number
  border: number
  binding: number
  radius: number
}

export interface initialQuiltDesign {
  name: string
  columns: number
  rows: number
  arrangement: string
  blockSize: number
  border?: number
  binding?: number
  radius?: number
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

export interface blockDesign {
  id: number
  name: string
  component: typeof PlainPatch | typeof HalfSquareTriangle | string
  fabrics: number[] // array of fabric IDs
}

export interface fabric {
  id: number
  name: string
  color: string
}
