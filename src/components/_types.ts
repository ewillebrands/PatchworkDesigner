export interface quiltDesign {
  id: string
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
  designId: string // should match one of the BlockDesign.id values
  position: blockPosition
  rotation?: number // in degrees, e.g., 0, 90, 180, 270
}

export interface blockPosition {
  row: number
  col: number
}

export interface fabric {
  id: string
  name: string
  color: string
}

// Atomic patch (single shape in a square)
export interface PatchDefinition {
  id: string
  path: string
  fabricId: string
}

// Atomic block (single square with patches)
export interface AtomicBlock {
  type: 'atomic'
  id: string
  name: string
  width?: number // in units (e.g., inches)
  height?: number // in units (e.g., inches)
  patches: PatchDefinition[]
  viewBox?: string // defaults to "0 0 100 100" for square blocks
}

// Compound block (grid of sub-blocks)
export interface CompoundBlock {
  type: 'compound'
  id: string
  name: string
  width?: number // in units (e.g., inches)
  height?: number // in units (e.g., inches)
  rows: number
  columns: number
  subBlocks: (AtomicBlock | CompoundBlock)[] // recursive!
}

export type BlockDesign = AtomicBlock | CompoundBlock
