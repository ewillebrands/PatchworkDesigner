import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import QuiltDesignEditor from '../views/QuiltDesignEditor.vue'
import BlockDesignEditor from '../views/BlockDesignEditor.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/quiltdesign/:name?', name: 'quiltdesign', component: QuiltDesignEditor, props: true },
  { path: '/blockdesign/:name', name: 'blockdesign', component: BlockDesignEditor, props: true },
  { path: '/network-error', name: 'networkerror', component: NetworkError },
  { path: '/404/:resource', name: 'notfoundwithresource', component: NotFound, props: true },
  { path: '/:catchAll(.*)', name: 'notfound', component: NotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
