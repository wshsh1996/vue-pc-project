<script setup lang="ts">
import MagnifyingGlass from '@/components/magnifyingGlass.vue'
import { ref } from 'vue'

// 放大镜图片数据
const magnifyingList = ref([
  {
    url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  },
  {
    url: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
  },
  {
    url: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
  },
  {
    url: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
  },
  {
    url: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
  },
  {
    url: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
  },
  {
    url: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
  },
  {
    url: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
  }
])
</script>

<template>
  <div class="main">
    <!--  放大镜  -->
    <magnifying-glass class="m-auto mt-10" :list="magnifyingList" />
  </div>
</template>

<style lang="scss" scoped></style>
