export interface quilt {
  blockCountWidth: number
  blockCountLength: number
  blocks: block[]
  border: number
  binding: boolean
  rounded: number
}
export interface block {
  name: string
}
