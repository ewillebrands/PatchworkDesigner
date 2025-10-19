import type { blockDesign } from '../components/_types'

export interface QuiltprojectServiceType {
  getBlockDesigns(): Promise<{ data: blockDesign[] }>
  getBlockDesignByName(name: string): Promise<{ data: blockDesign }>
  // Add other methods here as needed
}
