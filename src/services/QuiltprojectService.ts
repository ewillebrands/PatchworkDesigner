import axios from 'axios'
import type { BlockDesign, fabric } from '../components/_types'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/ewillebrands/PatchworkDesigner',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

async function getBlockDesigns(): Promise<{ data: BlockDesign[] }> {
  const response = await apiClient.get('/blockdesigns')
  return { data: response.data }
}

async function getFabricsCollection(): Promise<{ data: fabric[] }> {
  const response = await apiClient.get('/fabrics')
  return { data: response.data }
}

async function getFabricByName(name: string): Promise<{ data: fabric | null }> {
  const response = await apiClient.get(`/fabrics?name=${name}`)
  return { data: response.data[0] || null }
}

async function getFabricById(id: number): Promise<{ data: fabric | null }> {
  const response = await apiClient.get(`/fabrics?id=${id}`)
  return { data: response.data[0] || null }
}

export default {
  getBlockDesigns,
  getFabricsCollection,
  getFabricByName,
  getFabricById,
}
