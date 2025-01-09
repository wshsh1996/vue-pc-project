<template>
  <div class="slider-box">
    <slide-verify
      class="mb-10"
      :l="42"
      :r="10"
      :w="400"
      :h="200"
      ref="block"
      :imgs="imgs"
      :slider-text="text"
      :accuracy="10"
      @again="onAgain"
      @success="onSuccess"
      @fail="onFail"
      @refresh="onRefresh"
    ></slide-verify>
    <div
      v-if="confirm.visible"
      class="slide-tip-text"
      :class="{
        'success-tip': confirm.success,
        'fail-tip': confirm.fail
      }"
    >
      {{ msg }}
    </div>
    <!--    <button class="btn" @click="handleClick">在父组件可以点我刷新哦</button>-->
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
// 局部注册组件，需要单独引用组件样式
// 只提供局部引用的方式，不再采用插件形式，方便按需加载，减少主包大小
import SlideVerify, { type SlideVerifyInstance } from 'vue3-slide-verify'

import 'vue3-slide-verify/dist/style.css'

const emits = defineEmits(['update:modelValue'])
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

import img from '@/assets/images/slider/img.jpg'
import img1 from '@/assets/images/slider/img1.jpg'
import img2 from '@/assets/images/slider/img2.jpg'
import img3 from '@/assets/images/slider/img3.jpg'
import img4 from '@/assets/images/slider/img4.jpg'
import img5 from '@/assets/images/slider/img5.jpg'

const msg = ref('')
const confirm = reactive({
  success: false,
  fail: false,
  visible: false
})
const block = ref<SlideVerifyInstance>()
const imgs = ref([img, img1, img2, img3, img4, img5])
const text = ref('向右侧滑动校验')

const onAgain = () => {
  msg.value = '检测到非人为操作的哦！ try again'
  confirm.success = true
  confirm.fail = false
  confirm.visible = true
  // 刷新
  block.value?.refresh()
  emits('update:modelValue', false)
}

const onSuccess = (times: number) => {
  msg.value = `验证通过，耗时${(times / 1000).toFixed(1)}s`
  confirm.success = true
  confirm.fail = false
  confirm.visible = true

  emits('update:modelValue', true)
  // 刷新
  setTimeout(() => {
    block.value?.refresh()
    confirm.visible = false
  }, 1000)
}

const onFail = () => {
  msg.value = '验证不通过'
  confirm.fail = true
  confirm.success = false
  confirm.visible = true
  emits('update:modelValue', false)
  setTimeout(() => {
    confirm.visible = false
  }, 1000)
}

const onRefresh = () => {
  confirm.fail = false
  confirm.success = false
  emits('update:modelValue', false)
}

// const handleClick = () => {
//   // 刷新
//   block.value?.refresh()
//   msg.value = ''
//   confirm.fail = false
//   confirm.success = false
// }
</script>

<style lang="scss" scoped>
.slider-box {
  // 验证结果
  .slide-tip-text {
    padding-left: 5px;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .success-tip {
    color: #67c23a;
    background-color: #f0f9eb;
  }
  .fail-tip {
    color: #f56c6c;
    background-color: #fef0f0;
  }
  // 刷新按钮
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
  //:deep(.slide-verify-slider) {
  //  //background-color: pink;
  //}
  // 显示滑动提示文字
  //:deep(.container-active) {
  //  .slide-verify-slider-text {
  //    display: block;
  //  }
  //}
}
</style>
