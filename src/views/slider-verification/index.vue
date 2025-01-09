<template>
  <div class="content">
    <!--  简单的滑块验证  -->
    <simple-verification v-model="verificationBoolean" class="mb-20"></simple-verification>
    <!--  带图片的滑块验证 前端写死的校验  -->
    <!--  安装vue3-slide-verify地址：https://gitee.com/monoplasty/vue3-slide-verify  -->
    <div class="image-box">
      <image-verification v-model="verificationBoolean" class="mb-20 image-slider"></image-verification>
    </div>
    <!--  带文字的点击验证 前端写死的校验  -->
    <div class="image-box">
      <text-verification></text-verification>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import SimpleVerification from '@/components/slider/simple-verification.vue'
import ImageVerification from '@/components/slider/image-verification.vue'
import TextVerification from '@/components/slider/text-verification.vue'

const verificationBoolean = ref(false)

watch(
  () => verificationBoolean.value,
  (newVal) => {
    console.log('newVal', newVal)
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.content {
  margin: 10px auto;
  width: 600px;
  .image-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .image-slider {
      padding: 20px;
      background-color: #ececee;
    }
  }
}
</style>
