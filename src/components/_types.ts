import type { Component } from 'vue'

export interface quilt {
  columns: number
  rows: number
  blockList: block[]
  border: number
  binding: number
  radius: number
}
export interface block {
  design: string | Component
  position: [number, number]
  rotation?: [number]
}
