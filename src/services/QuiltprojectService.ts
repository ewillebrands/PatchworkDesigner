import axios from 'axios'
import type { blockDesign } from '../components/_types'
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

export default {
  getBlockDesigns,
  getBlockDesignByName,
}
