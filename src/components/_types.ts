import type { Component } from 'vue'

export interface quilt {
  blockCountWidth: number
  blockCountLength: number
  blockList: block[]
  border: number
  binding: boolean
  rounded: number
}
export interface block {
  design: Component
  position: [number, number]
  rotation?: [number]
}
