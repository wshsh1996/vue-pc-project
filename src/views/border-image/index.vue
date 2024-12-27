<script setup lang="ts">
import { ref } from 'vue'

/** 切换slice属性展示 */
const activeType = ref('number')
const handleClick = (val: string) => {
  activeType.value = val
}
</script>

<template>
  <div class="main">
    <!--  border-image-source  -->
    <h2 class="mb-40 col-fff center">
      border-image-source: none / url('@/assets/images/bgi.png') / linear-gradient() / repeating-linear-gradient()属性
    </h2>
    <div class="mb-40 box">
      <!--  border-image-source: none;  -->
      <img src="@/assets/images/meinv.png" class="img-box" alt="" />
      <!--  border-image-source: url();  -->
      <img src="@/assets/images/meinv.png" class="img-box1" alt="" />
      <!--  border-image-source: linear-gradient(to right, red, orange);  -->
      <img src="@/assets/images/meinv.png" class="img-box2" alt="" />
      <!--  border-image-source: linear-gradient(to right, red, orange);  -->
      <img src="@/assets/images/meinv.png" class="img-box3" alt="" />
    </div>
    <!--  border-image-slice  -->
    <h2 class="mb-40 col-fff center">
      <span>border-image-slice: </span>
      <span class="pointer col-green" :class="activeType === 'number' ? 'col-red' : ''" @click="handleClick('number')"
        >number像素</span
      >
      /
      <span class="pointer col-green" :class="activeType === 'percent' ? 'col-red' : ''" @click="handleClick('percent')"
        >%百分比</span
      >
      /
      <span>fill属性用于将图片中间部分以背景形式展示</span>
    </h2>
    <h2 class="mb-40 col-fff center">border-image-repeat: round; 平铺</h2>
    <div v-if="activeType === 'number'" class="mb-40 box">
      <!--  border-image-slice: number像素;  -->
      <img src="@/assets/images/meinv.png" class="img-box-slice-number" alt="" />
      <!--  border-image-source: url();  -->
      <img src="@/assets/images/meinv.png" class="img-box-slice1-number" alt="" />
      <!--  border-image-source: linear-gradient(to right, red, orange);  -->
      <img src="@/assets/images/meinv.png" class="img-box-slice2-number" alt="" />
    </div>
    <div v-if="activeType === 'percent'" class="mb-40 box">
      <!--  border-image-slice: number像素;  -->
      <img src="@/assets/images/meinv.png" class="img-box-slice-per" alt="" />
      <!--  border-image-source: url();  -->
      <img src="@/assets/images/meinv.png" class="img-box-slice1-per" alt="" />
      <!--  border-image-source: linear-gradient(to right, red, orange);  -->
      <img src="@/assets/images/meinv.png" class="img-box-slice2-per" alt="" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100vw;
  background-color: #000;
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  .img-box {
    margin-right: 40px;
    width: 360px;
    object-fit: cover;
    border: 30px pink solid; // 设置边框宽度和样式，不然border-image不起作用
    border-image-source: none;
  }
  .img-box1 {
    margin-right: 40px;
    width: 360px;
    object-fit: cover;
    border: 30px pink solid; // 设置边框宽度和样式，不然border-image不起作用
    border-image-source: url('@/assets/images/bgi.png');
  }
  .img-box2 {
    margin-right: 40px;
    width: 360px;
    object-fit: cover;
    border: 30px pink solid; // 设置边框宽度和样式，不然border-image不起作用
    border-image-source: linear-gradient(to right, red, orange);
  }
  .img-box3 {
    margin-right: 40px;
    width: 360px;
    object-fit: cover;
    border: 30px pink solid; // 设置边框宽度和样式，不然border-image不起作用
    border-image-source: repeating-linear-gradient(
      45deg,
      transparent,
      #4d9f0c 20px
    ); // repeating-linear-gradient(45deg, transparent, #4d9f0c 20px) 线性斜杠
  }

  .img-box-slice-number {
    margin-right: 40px;
    width: 360px;
    object-fit: cover;
    border: 30px pink solid; // 设置边框宽度和样式，不然border-image不起作用
    border-image-source: url('@/assets/images/bgi.png');
    border-image-slice: 30;
    border-image-repeat: round;
  }
  .img-box-slice1-number {
    margin-right: 40px;
    width: 360px;
    object-fit: cover;
    border: 30px pink solid; // 设置边框宽度和样式，不然border-image不起作用
    border-image-source: linear-gradient(to right, red, orange);
    border-image-slice: 30;
    border-image-repeat: round;
  }
  .img-box-slice2-number {
    margin-right: 40px;
    width: 360px;
    object-fit: cover;
    border: 30px pink solid; // 设置边框宽度和样式，不然border-image不起作用
    border-image-source: repeating-linear-gradient(
      45deg,
      transparent,
      #4d9f0c 20px
    ); // repeating-linear-gradient(45deg, transparent, #4d9f0c 20px) 线性斜杠
    border-image-slice: 30;
    border-image-repeat: round;
  }

  .img-box-slice-per {
    margin-right: 40px;
    width: 360px;
    object-fit: cover;
    border: 30px pink solid; // 设置边框宽度和样式，不然border-image不起作用
    border-image-source: url('@/assets/images/bgi.png');
    border-image-slice: 20%;
    border-image-repeat: round;
  }
  .img-box-slice1-per {
    margin-right: 40px;
    width: 360px;
    object-fit: cover;
    border: 30px pink solid; // 设置边框宽度和样式，不然border-image不起作用
    border-image-source: linear-gradient(to right, red, orange);
    border-image-slice: 20%;
    border-image-repeat: round;
  }
  .img-box-slice2-per {
    margin-right: 40px;
    width: 360px;
    object-fit: cover;
    border: 30px pink solid; // 设置边框宽度和样式，不然border-image不起作用
    border-image-source: repeating-linear-gradient(
      45deg,
      transparent,
      #4d9f0c 20px
    ); // repeating-linear-gradient(45deg, transparent, #4d9f0c 20px) 线性斜杠
    border-image-slice: 20%;
    border-image-repeat: round;
  }
}
</style>
