<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="row" style="margin-top: 2rem">
      <div class="t-collapse">
        <a class="collapse-target" href="#modal1">target 1</a>
        <div class="collapse-body" id="modal1">
          <a class="collapse-close" href="#">target 1</a>
          <p>
            在前面两篇文章《你不知道的CSS（一）》和《你不知道的CSS（二）》中大致介绍了一些CSS方面比较隐晦的但又很实用的技巧。相信这些技巧会为大家在项目实践中带来一定的帮助，本文作为《你不知道的CSS》系列的第三篇文章，将继续在CSS技巧方面进行探讨，不同于前两篇的是，本文将着重介绍CSS中伪类和伪元素在项目中的应用场景。伪类相信大家最熟悉也是用的最多的莫过于:hover,
            :active,
            :focus之类的，因为这些在平常的项目中太常用了（然而我目前依然见过还有用js去添加.hover类来变化背景色的同学😴）。而伪元素如:before,
            :after相信大家也用的烂熟了。
            当然对于比较常见的伪类（元素）不在本文的讨论范围类，本文主要介绍一些生僻的但是又非常实用的伪类(元素)。CSS的世界已经变天了，抛开过去，拥抱变化吧~
          </p>
        </div>
      </div>
      <div class="t-collapse">
        <a class="collapse-target" href="#modal2">target 2</a>
        <div class="collapse-body" id="modal2">
          <a class="collapse-close" href="#">target 2</a>
          <p>
            在前面两篇文章《你不知道的CSS（一）》和《你不知道的CSS（二）》中大致介绍了一些CSS方面比较隐晦的但又很实用的技巧。相信这些技巧会为大家在项目实践中带来一定的帮助，本文作为《你不知道的CSS》系列的第三篇文章，将继续在CSS技巧方面进行探讨，不同于前两篇的是，本文将着重介绍CSS中伪类和伪元素在项目中的应用场景。伪类相信大家最熟悉也是用的最多的莫过于:hover,
            :active,
            :focus之类的，因为这些在平常的项目中太常用了（然而我目前依然见过还有用js去添加.hover类来变化背景色的同学😴）。而伪元素如:before,
            :after相信大家也用的烂熟了。
            当然对于比较常见的伪类（元素）不在本文的讨论范围类，本文主要介绍一些生僻的但是又非常实用的伪类(元素)。CSS的世界已经变天了，抛开过去，拥抱变化吧~
          </p>
        </div>
      </div>
      <div class="t-collapse">
        <a class="collapse-target" href="#modal3">target 3</a>
        <div class="collapse-body" id="modal3">
          <a class="collapse-close" href="#">target 3</a>
          <p>
            在前面两篇文章《你不知道的CSS（一）》和《你不知道的CSS（二）》中大致介绍了一些CSS方面比较隐晦的但又很实用的技巧。相信这些技巧会为大家在项目实践中带来一定的帮助，本文作为《你不知道的CSS》系列的第三篇文章，将继续在CSS技巧方面进行探讨，不同于前两篇的是，本文将着重介绍CSS中伪类和伪元素在项目中的应用场景。伪类相信大家最熟悉也是用的最多的莫过于:hover,
            :active,
            :focus之类的，因为这些在平常的项目中太常用了（然而我目前依然见过还有用js去添加.hover类来变化背景色的同学😴）。而伪元素如:before,
            :after相信大家也用的烂熟了。
            当然对于比较常见的伪类（元素）不在本文的讨论范围类，本文主要介绍一些生僻的但是又非常实用的伪类(元素)。CSS的世界已经变天了，抛开过去，拥抱变化吧~
          </p>
        </div>
      </div>
      <div class="t-collapse">
        <a class="collapse-target" href="#modal4">target 4</a>
        <div class="collapse-body" id="modal4">
          <a class="collapse-close" href="#">target 4</a>
          <p>
            在前面两篇文章《你不知道的CSS（一）》和《你不知道的CSS（二）》中大致介绍了一些CSS方面比较隐晦的但又很实用的技巧。相信这些技巧会为大家在项目实践中带来一定的帮助，本文作为《你不知道的CSS》系列的第三篇文章，将继续在CSS技巧方面进行探讨，不同于前两篇的是，本文将着重介绍CSS中伪类和伪元素在项目中的应用场景。伪类相信大家最熟悉也是用的最多的莫过于:hover,
            :active,
            :focus之类的，因为这些在平常的项目中太常用了（然而我目前依然见过还有用js去添加.hover类来变化背景色的同学😴）。而伪元素如:before,
            :after相信大家也用的烂熟了。
            当然对于比较常见的伪类（元素）不在本文的讨论范围类，本文主要介绍一些生僻的但是又非常实用的伪类(元素)。CSS的世界已经变天了，抛开过去，拥抱变化吧~
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.t-collapse {
  border: 1px solid #ccc;
  margin-top: -1px;
  &:first-child {
    margin-top: 0;
  }
  .collapse-target,
  .collapse-close {
    cursor: pointer;
    height: 3rem;
    line-height: 2rem;
    padding: 0.5rem 2rem;
    text-decoration: none;
    user-select: none;
    background: #eee;
  }
  > .collapse-target {
    display: block;
  }
  > .collapse-body {
    position: relative;
    display: none;
    padding: 2rem;
    .collapse-close {
      display: none;
      position: absolute;
      top: -3rem;
      width: 100%;
      left: 0;
    }
    &:target {
      display: block;
      .collapse-close {
        display: block;
        border-bottom: 1px solid #ddd;
      }
    }
  }
}
</style>
