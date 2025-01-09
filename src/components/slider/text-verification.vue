<template>
  <div>
    <p>请按照 ‘{{ textRank }}’ 的顺序点击</p>
    <div id="perustarkistus" class="perustarkistus">
      <img :src="imageSrc" :style="{ width: parentWidth + 'px', height: parentHeight + 'px' }" alt="" />
      <div
        v-for="(item, indexS) in getTextPositionData"
        :key="indexS"
        :style="{
          left: item.x + 'px',
          top: item.y + 'px',
          width: textWidth + 'px',
          height: textWidth + 'px',
          transform: `rotate(${item.transform}deg)`,
          fontSize: 20 + 'px',
          lineHeight: `${textWidth}px`
        }"
        class="positionDiv"
        @click="textClickFun(item.text)"
      >
        <span>{{ item.text }}</span>
        <span v-if="item.rank !== null">{{ item.rank + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import { getRandomUniqueIndexes } from '@/utils/slider'
import { ElMessage } from 'element-plus'

type textPositionType = {
  x: number
  y: number
  width: number
  height: number
  transform: number
  text: string
}
// 用来随机选择文字
const textString =
  '凭趟押王玉抹凶超护报抢趁凳抬出击披越趋跳叉又边友及反双达悟辽发辣悄叔取受变辪辫叙磁槽蛛蛙蛇韵音蛋槐蛾磨蛮砌砍码霸露研砖婶云御泰京亭亮泉亩泊享交泄亦产得徐亡菠徒亿穗武委姐姑箱钓姓钞姜薯钟薪管箭箩钉始针薄沉莫忙仪们代沃令以志沙任忍份忌沟仿莲仰心刑灰灯灭刊火分切慕刃刀蹲炒躁炕勺勾勿勤炉炊炎勒龙炸点身躬炼龟躲勇龄勉躺炮炭励劲劳商眠易眯星眨啊昆昂昌眼昏明啦省显昼看眉春'
const bgPictures = [
  'https://img2.baidu.com/it/u=1381481047,1529970259&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500',
  'https://img2.baidu.com/it/u=4286724097,1475456570&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
  'https://img1.baidu.com/it/u=2310170655,486191485&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
  'https://img2.baidu.com/it/u=2526401426,2132302010&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
  'https://img2.baidu.com/it/u=2279721922,3725358742&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
  'https://img1.baidu.com/it/u=2605372625,2257936617&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
  'https://img2.baidu.com/it/u=188805366,3528195373&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=675',
  'https://img0.baidu.com/it/u=381886100,3541087750&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
  'https://img2.baidu.com/it/u=769068768,1914010451&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
] // 背景图片列表

// 这里的数据可以加入 textPosition 里面 因为是死数据，没啥影响
// const textNum = 4  // 需要点击的个数
const allTextNum = 4 // 生成文字的个数/需要点击的个数
const textWidth = 30 // 文字的宽度
const parentWidth = 300 // 宽度
const parentHeight = 180 // 高度
const angleRange = 90 // 旋转角度范围 例如值为90 就是-90~90
const textRank = ref('') // 文本顺序
const clickTextRank = ref('') // 点击文本的顺序
const textPosition = reactive({
  textPositionData: [] as textPositionType[]
}) // 文本生成的位置
const imageSrc = ref('') // 随机选择的图片src
// 文字点击事件
const textClickFun = (text: string) => {
  if (clickTextRank.value.includes(text)) {
    clickTextRank.value = clickTextRank.value.replace(text, '')
  } else {
    clickTextRank.value += text
  }
  console.log('clickTextRank', clickTextRank.value)
}

// 检测两个矩形是否重叠的函数
const isOverlapping = (rect1: textPositionType, rect2: textPositionType) => {
  return !(
    rect1.x + rect1.width <= rect2.x ||
    rect2.x + rect2.width <= rect1.x ||
    rect1.y + rect1.height <= rect2.y ||
    rect2.y + rect2.height <= rect1.y
  )
}
// 生成随机位置的函数
const generateRandomPosition = (
  existingPositions: textPositionType[],
  parentWidth: number,
  parentHeight: number,
  elementWidth: number,
  elementHeight: number
) => {
  let position
  let overlap

  do {
    overlap = false
    position = {
      x: Math.floor(Math.random() * (parentWidth - elementWidth)),
      y: Math.floor(Math.random() * (parentHeight - elementHeight)),
      width: elementWidth,
      height: elementHeight,
      transform: Math.floor(Math.random() * (angleRange + angleRange + 1)) - angleRange,
      text: ''
    }

    // 检查新位置是否与现有位置重叠
    for (const existing of existingPositions) {
      if (isOverlapping(position, existing)) {
        overlap = true
        break
      }
    }
  } while (overlap)

  return position
}
const changeSelectImage = () => {
  const newPositions: textPositionType[] = [] // 用来生成文字定位信息
  // （所需字符串的长度）    allTextNum：生成点击文字的个数
  const textOptionArr = getRandomUniqueIndexes(textString.length, allTextNum)
  let textSelectString = '' // 文本顺序
  for (let i = 0; i < allTextNum; i++) {
    // 位置信息     图片宽度    图片高度    文本宽度
    const newPosition = generateRandomPosition(newPositions, parentWidth, parentHeight, textWidth, textWidth)
    newPositions.push({ ...newPosition, text: textString[textOptionArr[i]] })
    textSelectString += textString[textOptionArr[i]]
  }
  textRank.value = textSelectString
  console.log('newPositions', newPositions)
  textPosition.textPositionData = newPositions
}

const getTextPositionData = computed(() => {
  const data: any = []
  textPosition.textPositionData.forEach((item) => {
    const rankIndex = clickTextRank.value.indexOf(item.text)
    data.push({
      ...item,
      rank: rankIndex !== -1 ? rankIndex : null
    })
  })

  console.log('data', data)
  return data
})
onBeforeMount(() => {
  imageSrc.value = bgPictures[Math.floor(Math.random() * 9)]
  changeSelectImage()
})

watch(clickTextRank, (newValue, oldValue) => {
  if (clickTextRank.value.length === allTextNum) {
    if (clickTextRank.value === textRank.value) {
      ElMessage({
        message: '正确',
        type: 'success'
      })
      // 某些操作···
    } else {
      ElMessage.error('错误')
      clickTextRank.value = ''
      changeSelectImage()
    }
  }
})
</script>

<style lang="scss" scoped>
#perustarkistus.perustarkistus {
  position: relative;

  div.positionDiv {
    position: absolute;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    z-index: 1;

    span {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      background-color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>
