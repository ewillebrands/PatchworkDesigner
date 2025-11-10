import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import QuiltDesignView from '../views/QuiltDesignView.vue'
import BlockDesignView from '../views/BlockDesignView.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/quiltdesign', name: 'quiltdesign', component: QuiltDesignView },
  { path: '/blockdesign/:name', name: 'blockdesign', component: BlockDesignView, props: true },
  { path: '/404/:resource', name: 'notfoundwithresource', component: NotFound, props: true },
  { path: '/:catchAll(.*)', name: 'notfound', component: NotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
