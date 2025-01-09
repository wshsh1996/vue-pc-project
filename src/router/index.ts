import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    },
    // 放大镜
    {
      path: '/magnifying',
      name: 'magnifying',
      component: () => import('@/views/magnifyingGlass/index.vue')
    },
    // 上传文件
    {
      path: '/imageUpload',
      name: 'imageUpload',
      component: () => import('@/views/imageUpload/index.vue')
    },
    // 表格拖拽
    {
      path: '/table',
      name: 'table',
      component: () => import('@/views/table/index.vue')
    },
    // 自适应布局
    {
      path: '/self-adaptation',
      name: 'self-adaptation',
      component: () => import('@/views/self-adaptation/index.vue')
    },
    // border-image属性用法
    {
      path: '/border-image',
      name: 'border-image',
      component: () => import('@/views/border-image/index.vue')
    },
    // 折叠面板
    {
      path: '/collapse',
      name: 'collapse',
      component: () => import('@/views/collapse/index.vue')
    },
    // 波浪进度
    {
      path: '/wave-progress',
      name: 'wave-progress',
      component: () => import('@/views/waveProgress/index.vue')
    },
    // 滑块验证
    {
      path: '/slider-verification',
      name: 'slider-verification',
      component: () => import('@/views/slider-verification/index.vue')
    }
  ]
})

export default router
