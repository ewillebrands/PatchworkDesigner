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

export interface fabric {
  id: number
  name: string
  color: string
}

// Atomic patch (single shape in a square)
export interface PatchDefinition {
  id: number
  path: string
  fabricId: number
}

// Atomic block (single square with patches)
export interface AtomicBlock {
  type: 'atomic'
  id: string
  name: string
  patches: PatchDefinition[]
  viewBox?: string // defaults to "0 0 100 100" for square blocks
}

// Compound block (grid of sub-blocks)
export interface CompoundBlock {
  type: 'compound'
  id: string
  name: string
  rows: number
  columns: number
  subBlocks: (AtomicBlock | CompoundBlock)[] // recursive!
}

export type BlockDesign = AtomicBlock | CompoundBlock
