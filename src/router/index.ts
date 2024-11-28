import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/magnifying',
      name: 'magnifying',
      component: () => import('@/views/magnifyingGlass/index.vue')
    }
  ]
})

export default router
