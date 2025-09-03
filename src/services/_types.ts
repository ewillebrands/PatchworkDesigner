import type { BlockDesign } from '../components/_types'

export interface QuiltprojectServiceType {
  getBlockDesigns(): Promise<{ data: BlockDesign[] }>
  getBlockDesignByName(name: string): Promise<{ data: BlockDesign }>
  // Add other methods here as needed
}
