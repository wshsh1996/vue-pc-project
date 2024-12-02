<script setup lang="ts">
// 当前激活的图片索引
import { onMounted, reactive, ref } from 'vue'
import type { PicItem } from '@/type/magnifying'

const props = defineProps<{
  list: Array<{ url: string }>
}>()

const activePicIndex = ref(0)
// 当前激活的图片url
const activePicUrl = ref('https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg')
// 激活图片的样式
const activeStyle = reactive({
  width: '450px',
  height: '450px'
})

const picList = ref<PicItem[]>([])

const gallerysStyle = reactive({
  marginLeft: '0px'
})

// 缩略图的宽度：即每次移动的left距离
const picWidth = 68
// 最大可移动的距离：绝对值
const maxMarginLeft = ref(0)
// 最大可移动的距离：实际marginLeft可达到的值
const peakMarginLeft = ref(0)

// 新增 每次移动多少距离
const division = (numerator: number, denominator: number) => {
  return numerator / denominator
}

/** 鼠标悬浮 */
const handleGalleryMouseover = (pic: PicItem, index: number) => {
  activePicIndex.value = index // 当前索引
  activePicUrl.value = pic.url // 图片url
}
let timer: any = null
/** 缩略图栏：向右移动 */
const handleNext = () => {
  // 当前移动的距离
  const currentMarginLeft = parseInt(gallerysStyle.marginLeft.replace('px', ''))
  // 移动次数 指缩略图栏向右移动时，动画分为 10 步完成
  const limit = 10
  // 每次移动多少距离 每一步移动的距离是 moveDistance，计算公式为 picWidth / limit，即每次移动的距离是缩略图宽度的十分之一
  const moveDistance = division(picWidth, limit)
  // 如果最大可位移量大于0，并且当前移动的距离大于最大可移动的距离（真实值：负数）

  if (maxMarginLeft.value > 0 && currentMarginLeft > peakMarginLeft.value) {
    // 当前移动了几次：计数
    let count = 0

    // 位移动画
    timer = setInterval(() => {
      count++
      if (count > limit) {
        return clearInterval(timer)
      }
      const moveLeft = currentMarginLeft - moveDistance * count
      gallerysStyle.marginLeft = moveLeft + 'px'
    }, 30)
  }
}
/** 缩略图栏：向左移动 */
const handlePrev = () => {
  // 当前移动的距离
  const currentMarginLeft = parseInt(gallerysStyle.marginLeft.replace('px', ''))
  // 移动次数
  const limit = 10
  // 每次移动多少距离
  const moveDistance = division(picWidth, limit)
  // 当前移动的距离小于0时，即向右移动过
  if (currentMarginLeft < 0) {
    // 当前移动了几次：计数
    let count = 0
    // 位移动画
    timer = setInterval(() => {
      count++
      if (count > limit) {
        return clearInterval(timer)
      }
      const moveLeft = currentMarginLeft + moveDistance * count
      gallerysStyle.marginLeft = moveLeft + 'px'
    }, 30)
  }
}

/** 获取图片样式：激活或未激活 */
const getImgClass = (index: number) => {
  return activePicIndex.value === index ? 'thumb-img is-active' : 'thumb-img'
}

/** 放大镜：移入商品图片区域 */
const handleZoomMouseover = () => {
  const zoom = document.getElementById('zoom')
  const big = document.getElementById('big')
  if (zoom) {
    zoom.style.display = 'block'
  }
  if (big) {
    big.style.display = 'block'
  }
}
/** 放大镜：移出商品图片区域 */
const handleZoomMouseout = () => {
  const zoom = document.getElementById('zoom')
  const big = document.getElementById('big')
  if (zoom) {
    zoom.style.display = 'none'
  }
  if (big) {
    big.style.display = 'none'
  }
}

// 获取元素相对于视口的位置
const getViewportOffset = (element: HTMLElement): { top: number; left: number } => {
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top,
    left: rect.left
  }
}

// 放大比例：
const rate = 450 / 160
/** 在商品图片区域上移动 */
const handleZoomMousemove = (e: MouseEvent) => {
  const zoom = document.getElementById('zoom')
  const bigPic = document.getElementById('big-pic')
  const wapper = document.getElementById('wapper')
  const wapperOffset = getViewportOffset(wapper as HTMLElement)
  // 获得鼠标如何移动的方式：根据鼠标方向移动:移动的像素是多少
  // e.clientX  e.clientY : 鼠标相对于页面左上角的位置
  // wapperOffset.left  wapperOffset.top ：图片展示框距离页面左上角的位置
  // e.clientX - wapperOffset.left：鼠标相对于图片展示框的位置
  // 80 = 放大镜框的宽度 / 2； 宽高一致
  // zoomX、zoomY：放大镜框相对于图片展示框的位置
  let zoomX = e.clientX - wapperOffset.left - 80
  let zoomY = e.clientY - wapperOffset.top - 80

  // zoom边界的处理：即放大镜框最大可移动区域
  //左边界
  if (zoomX < 0) {
    zoomX = 0
  }
  // 右边界：290 = 450 - 160，即图片展示框宽度 - 放大镜宽度
  if (zoomX >= 290) {
    zoomX = 290
  }
  // 上边界
  if (zoomY < 0) {
    zoomY = 0
  }
  // 下边界
  if (zoomY >= 290) {
    zoomY = 290
  }
  // 放大镜移动
  if (zoom) {
    zoom.style.left = zoomX + 'px'
    zoom.style.top = zoomY + 'px'
  }
  // 放大后的图片跟随移动
  if (bigPic) {
    bigPic.style.marginLeft = -zoomX * rate + 'px'
    bigPic.style.marginTop = -zoomY * rate + 'px'
  }
}

/** 初始化 */
onMounted(() => {
  if (props.list && props.list.length > 0) {
    picList.value = props.list

    // 初始化时，默认激活一张图片，索引默认为 0
    activePicUrl.value = picList.value[activePicIndex.value].url

    // 图片数量
    const len = picList.value.length
    // 可展示5张图，只有大于5张图才需要切换滚动
    // marginLeft的最大值为0，向左/右移动的最大距离为 （缩略图栏宽度 - 展示区域宽度）
    // 最大可位移的距离：绝对值
    maxMarginLeft.value = len > 5 ? (len - 5) * picWidth : 0
    // 最大可位移的距离：真实值
    peakMarginLeft.value = maxMarginLeft.value * -1
  }
})
</script>

<template>
  <div class="zoom-big-container">
    <!-- 图片展示区域 -->
    <div
      id="wapper"
      class="gallery-pic-wrap"
      @mouseover="handleZoomMouseover"
      @mouseout="handleZoomMouseout"
      @mousemove="handleZoomMousemove"
    >
      <img :src="activePicUrl" alt="错误" :style="activeStyle" />
      <!-- 放大镜 -->
      <div id="zoom" class="zoom-box"></div>
    </div>
    <!-- 放大后的图片展示区域 -->
    <div id="big" class="big-pic-box">
      <img
        id="big-pic"
        :src="activePicUrl"
        alt="错误"
        style="width: calc((450 / 160) * 450px); height: calc((450 / 160) * 450px)"
      />
    </div>
    <!-- 缩略图 -->
    <div class="gallery-nav">
      <div class="btn" @click="handlePrev">
        <div class="prev"></div>
      </div>
      <div class="thumbs">
        <ul class="gallerys" :style="gallerysStyle">
          <li v-for="(pic, index) of picList" :key="index" @mouseover="handleGalleryMouseover(pic, index)">
            <img :src="pic.url" alt="错误" :class="getImgClass(index)" />
          </li>
        </ul>
      </div>
      <div class="btn" @click="handleNext">
        <div class="next"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scope>
.zoom-big-container {
  position: relative;
  width: 450px;
  // 图片展示区域
  .gallery-pic-wrap {
    position: relative;
    width: 450px;
    height: 450px;
    .zoom-box {
      width: 160px;
      height: 160px;
      background-color: #ffffff;
      border: 1px solid #cccccc;
      box-sizing: border-box;
      opacity: 0.5;
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }
  }
  // 缩略图区域
  .gallery-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 450px;
    height: 62px;
    margin-top: 20px;
    .thumbs {
      width: 340px;
      height: 100%;
      overflow: hidden;
      .gallerys {
        padding: 0px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 62px;
          height: 62px;
          margin: 3px;
          cursor: pointer;
          user-select: none;
          .thumb-img {
            width: 62px;
            height: 62px;
            margin: 0px;
            box-sizing: border-box;
          }
          .is-active {
            border: 1px solid #ca141d;
          }
        }
      }
    }
    .btn {
      position: relative;
      width: 30px;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
      transition: all 0.3s;
      background-color: #edf2fa;
      &:hover {
        opacity: 0.6;
      }
      .prev {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 10px solid #999; /* 箭头的颜色 */
      }
      .next {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid #999; /* 箭头的颜色 */
      }
    }
  }
  // 放大的图片展示区域
  .big-pic-box {
    width: 450px;
    height: 450px;
    position: absolute;
    box-sizing: border-box;
    border: 2px solid #cccccc;
    top: 0px;
    left: 460px;
    z-index: 999;
    display: none;
    overflow: hidden;
    .big-pic {
      width: 900px;
      height: 900px;
    }
  }
}
</style>
