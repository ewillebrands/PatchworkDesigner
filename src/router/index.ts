import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import QuiltDesignView from '../views/QuiltDesignView.vue'
import BlockDesignView from '../views/BlockDesignView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/quiltdesign', name: 'quiltdesign', component: QuiltDesignView },
  { path: '/blockdesign', name: 'blockdesign', component: BlockDesignView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
