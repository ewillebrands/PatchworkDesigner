import axios from 'axios'
import type { blockDesign, fabric } from '../components/_types'
import componentMap from '@/components/blocktemplates/ComponentMap'
import PlainPatch from '@/components/blocktemplates/PlainPatch.vue'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/ewillebrands/PatchworkDesigner',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
async function getBlockDesigns(): Promise<{ data: blockDesign[] }> {
  const response = await apiClient.get('/blockdesigns')
  // Map each design's component string to the actual Vue component
  const mappedData = response.data.map((design: blockDesign) => ({
    ...design,
    component: componentMap[String(design.component)] || PlainPatch,
  }))
  return { data: mappedData }
}

async function getBlockDesignByName(name: string): Promise<{ data: blockDesign }> {
  const response = await apiClient.get(`/blockdesigns?name=${name}`)
  const design = response.data[0]
  return {
    data: {
      ...design,
      component: componentMap[String(design.component)] || PlainPatch,
    },
  }
}

async function getFabricsCollection(): Promise<{ data: fabric[] }> {
  const response = await apiClient.get('/fabrics')
  return {
    data: response.data.map((fabric: fabric) => ({
      id: fabric.id,
      name: fabric.name,
      color: fabric.color,
    })),
  }
}

async function getFabricByName(name: string): Promise<{ data: fabric }> {
  const response = await apiClient.get(`/fabrics?name=${name}`)
  const fabric = response.data[0]
  return {
    data: {
      id: fabric.id,
      name: fabric.name,
      color: fabric.color,
    },
  }
}

async function getFabricsByBlockDesignName(name: string): Promise<{ data: fabric[] }> {
  const blockDesignResponse = await apiClient.get(`/blockdesigns?name=${name}`)
  const fabricNames = blockDesignResponse.data[0].fabrics
  const fabricResponses = await Promise.all(
    fabricNames.map((name: string) => getFabricByName(name)),
  )
  const fabrics = fabricResponses.map((response) => response.data)
  return {
    data: fabrics.map((fabric) => ({
      id: fabric.id,
      name: fabric.name,
      color: fabric.color,
    })),
  }
}

export default {
  getBlockDesigns,
  getBlockDesignByName,
  getFabricsCollection,
  getFabricByName,
  getFabricsByBlockDesignName,
}
