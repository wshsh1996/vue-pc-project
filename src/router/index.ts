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
    },
    {
      path: '/imageUpload',
      name: 'imageUpload',
      component: () => import('@/views/imageUpload/index.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('@/views/table/index.vue')
    },
    {
      path: '/self-adaptation',
      name: 'self-adaptation',
      component: () => import('@/views/self-adaptation/index.vue')
    },
    {
      path: '/border-image',
      name: 'border-image',
      component: () => import('@/views/border-image/index.vue')
    },
    {
      path: '/collapse',
      name: 'collapse',
      component: () => import('@/views/collapse/index.vue')
    },
    {
      path: '/wave-progress',
      name: 'wave-progress',
      component: () => import('@/views/waveProgress/index.vue')
    }
  ]
})

export default router
