<script setup lang="ts">
import { ref } from 'vue'

const routerList = ref([
  { path: '/magnifying', name: '商城放大镜' },
  { path: '/imageUpload', name: '上传文件（拖拽）' },
  { path: '/table', name: 'table表格拖拽' },
  { path: '/self-adaptation', name: '自适应布局' },
  { path: '/border-image', name: 'border-image属性' },
  { path: '/collapse', name: '折叠面板' },
  { path: '/wave-progress', name: '波浪进度' },
  { path: '/slider-verification', name: '滑块验证' }
])
</script>

<template>
  <div class="flex ac jc h100vh">
    <router-link v-for="item in routerList" :key="item.path" class="mr-20" :to="item.path">{{ item.name }}</router-link>
  </div>
</template>

<style scoped lang="scss"></style>
