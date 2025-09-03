import axios from 'axios'
import type { QuiltprojectServiceType } from './_types'
import type { BlockDesign } from '../components/_types'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/ewillebrands/PatchworkDesigner',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
const QuiltprojectService: QuiltprojectServiceType = {
  getBlockDesigns(): Promise<{ data: BlockDesign[] }> {
    return apiClient.get('/blockdesigns')
  },
  getBlockDesignByName(name): Promise<{ data: BlockDesign }> {
    return apiClient.get(`/blockdesigns/${name}`)
  },
}

export default QuiltprojectService
