<script setup lang="ts"></script>

<template>
  <!--  百分比布局（流式布局）  -->
  <div class="percent-box">
    <div>百分比布局</div>
    <div class="percent">
      <div>容器宽度占父元素宽度的80%,居中显示容器宽度占父元素宽度的80%,居中显示</div>
    </div>
    <div class="percent-square">
      <div class="percent-square-content">
        <div>百分比设置正方形，并且子元素不会撑大父元素</div>
      </div>
    </div>
  </div>
  <!--  媒体查询  -->
  <div>
    <div>媒体查询布局</div>
    <div class="media-box">
      <div v-for="i in 4" :key="i" class="media-item"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/** 百分比布局 */
.percent-box {
  margin-bottom: 10px;
  background-color: #13e2c3;
  .percent {
    width: 80%; /* 容器宽度占父元素宽度的80% */
    margin: 0 auto; /* 居中显示 */
    background-color: pink;
  }

  .percent-square {
    margin: 1% auto; /* 居中显示 */
    width: 25%; /* 盒子宽度占容器宽度的25% */
    //padding-top: 25%; /* 盒子高度为宽度的25%，实现正方形 */
    position: relative; /* 设置相对定位 */
    background-color: skyblue;
    &::before {
      content: '';
      display: block;
      padding-top: 100%; /* 创建正方形 */
    }
    .percent-square-content {
      position: absolute; /* 绝对定位 */
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}

/** 媒体查询 */
.media-box {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 10px;
  padding: 10px;
  width: 60%;
  background-color: #13e2c3;
}

.media-item {
  width: 220px;
  height: 100px;
  background-color: palegoldenrod;
}

@media screen and (max-width: 1520px) {
  .media-item {
    width: 400px;
    margin-bottom: 10px;
    &:nth-child(3) {
      margin-bottom: 0;
    }
    &:nth-child(4) {
      margin-bottom: 0;
    }
  }
}

@media screen and (max-width: 1390px) {
  .media-box {
    justify-content: center;
  }
  .media-item {
    width: 100%;
    margin-bottom: 10px;
    &:nth-child(3) {
      margin-bottom: 10px;
    }
    &:nth-child(4) {
      margin-bottom: 0;
    }
  }
}
</style>
