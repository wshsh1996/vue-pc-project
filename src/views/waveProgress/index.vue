<script setup lang="ts">
import { onMounted } from 'vue'

const updateProcess = () => {
  // 获取进度条元素
  const progress: any = document.querySelector('.progress')
  const number: any = document.querySelector('.number')
  // 进度值
  let progressValue = 0
  // 模拟获取进度
  const timer = setInterval(() => {
    progressValue += 1
    // 更新波浪进度条的进度
    progress.style.setProperty('--progress', `${progressValue}%`)
    // 更新进度数字
    number.textContent = `${progressValue}%`
    // 记得清除定时器
    if (progressValue === 100) {
      clearInterval(timer)
      updateProcess()
    }
  }, 500)
}

onMounted(() => {
  updateProcess()
})
</script>

<template>
  <!-- 圆形波浪进度条外层元素 -->
  <div class="progress-box">
    <!-- 波浪效果元素 设置了一个css变量  -->
    <div class="progress" style="--progress: 0%"></div>
    <!-- 进度数字 -->
    <p class="number">0%</p>
  </div>
</template>

<style scoped lang="scss">
/* 定一个旋转动画 用于实现波浪效果 */
@keyframes progressRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 设置外层元素样式 */
.progress-box {
  margin: 50px auto 0;
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid #6495ed;
  background: #fff;
  /* 最关键的属性 */
  overflow: hidden;
}

/* 设置进度条样式 */
.progress {
  position: absolute;
  /* 波浪占据外层圆形区域的百分比 由 --progress控制 */
  top: calc(100% - var(--progress));
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
  width: 200%;
  height: 200%;
  border-radius: 40%;
  background: #6495ed;
  /* 添加旋转动画效果 */
  animation: progressRotate 2.5s linear infinite;
  /* 由于上面使用了transform 且动画中也使用了transform 设置该属性使其叠加生效 */
  animation-composition: add;
}

/* 设置进度数字样式 */
.number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  margin: 0;
  font-size: 24px;
}
</style>
