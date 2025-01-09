<template>
  <div class="slider-box">
    <slide-verify
      :l="42"
      :r="10"
      :w="400"
      :h="200"
      ref="block"
      :imgs="imgs"
      slider-text="向右侧滑动校验"
      :accuracy="10"
      @again="onAgain"
      @success="onSuccess"
      @fail="onFail"
      @refresh="onRefresh"
    ></slide-verify>
    <button class="btn" @click="handleClick">在父组件可以点我刷新哦</button>
    <div>{{ msg }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 局部注册组件，需要单独引用组件样式
// 只提供局部引用的方式，不再采用插件形式，方便按需加载，减少主包大小
import SlideVerify, { type SlideVerifyInstance } from 'vue3-slide-verify'

import 'vue3-slide-verify/dist/style.css'

import img from '@/assets/images/slider/img.jpg'
import img1 from '@/assets/images/slider/img1.jpg'
import img2 from '@/assets/images/slider/img2.jpg'
import img3 from '@/assets/images/slider/img3.jpg'
import img4 from '@/assets/images/slider/img4.jpg'
import img5 from '@/assets/images/slider/img5.jpg'

const msg = ref('')
const block = ref<SlideVerifyInstance>()
const imgs = ref([img, img1, img2, img3, img4, img5])

const onAgain = () => {
  msg.value = '检测到非人为操作的哦！ try again'
  // 刷新
  block.value?.refresh()
}

const onSuccess = (times: number) => {
  msg.value = `login success, 耗时${(times / 1000).toFixed(1)}s`
}

const onFail = () => {
  msg.value = '验证不通过'
}

const onRefresh = () => {
  msg.value = '点击了刷新小图标'
}

const handleClick = () => {
  // 刷新
  block.value?.refresh()
  msg.value = ''
}
</script>

<style lang="scss" scoped>
.slider-box {
  margin: 0 auto;
  width: 400px;
  height: 200px;
  .btn {
    margin-top: 20px;
    outline: 0;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    color: #fff;
    background-color: #1890ff;
    cursor: pointer;
  }
  .btn:active {
    box-shadow: 1px 5px 0 rgba(0, 0, 0, 0.1) inset;
  }
  :deep(.slide-verify-slider) {
    background-color: pink;
  }
}
</style>
