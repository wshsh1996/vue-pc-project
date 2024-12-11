<script setup lang="ts">
import { Picture, Sort } from '@element-plus/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'

const emits = defineEmits(['update:modelValue', 'clearRecognize'])
// 设置默认值
const props = withDefaults(
  defineProps<{
    modelValue: any
    type?: any // 上传类型
    url?: string
    limit?: number // 限制
    size?: any // 上传尺寸
    width?: string
    height?: string
    isPreview?: boolean
  }>(),
  {
    url: '#',
    limit: 0, // 设置 limit 的默认值为 0
    type: ['image/png', 'image/jpg', 'image/jpeg'] as string[], // 设置 type 的默认值为 ['image', 'jpg', 'png', 'jpeg']
    size: null, // 设置 size 的默认值为 null
    width: '60px',
    height: '60px',
    isPreview: true // 设置 isPreview 的默认值为 true
  }
)

// const props = defineProps<{
//   modelValue: any
//   url: string
//   limit?: number // 限制
//   type?: any // 上传类型
//   size?: any // 上传尺寸
//   width: string
//   height: string
//   id?: any
//   classify?: string // 上传分区
//   readType?: string
//   isPreview?: boolean
// }>()

// 上传功能
const fileList = ref<any[]>([])
const dialogVisible = ref(false)
const initialIndex = ref(0)
const previewList = ref<any>([])

// 上传前限制
const handleBefore = async (rawFile: File) => {
  if (props.type && props.type.length > 0) {
    const isValidFormat = props.type.indexOf(rawFile.type) > -1
    if (!isValidFormat) {
      // 处理格式信息
      const types = props.type.map((mime: string) => mime.split('/')[1])
      ElMessage.warning(`图片只能是${types.join(',')}后缀!`)
      return false
    }
  }
  if (props.size) {
    const isLtM = rawFile.size <= 1024 * 1024 * props.size
    if (!isLtM) {
      ElMessage.warning(`图片大小不超过${props.size}M`)
      return false
    }
  }
}

// 图片上传
const handleSuccess = async (res: any, file: any) => {
  // fileList url为blob，先更改里面的url为正常地址
  // 公共上传

  file.url = res.data
  if (props.limit && props.limit > 1) {
    emits(
      'update:modelValue',
      fileList.value.map((item) => item.url)
    )
  } else {
    emits('update:modelValue', fileList.value[0].url)
  }
  // 触发父组件事件，校验信息
  emits('clearRecognize')
}

// 删除
const handleRemove = () => {
  // 删除
  if (props.limit && props.limit > 1) {
    emits(
      'update:modelValue',
      fileList.value.map((item) => item.url)
    )
  } else {
    emits('update:modelValue', '')
  }
  // 触发父组件事件，校验信息
  emits('clearRecognize')
}

// 预览
const handlePictureCardPreview = (file: any) => {
  previewList.value = fileList.value.map((item) => item.url)
  initialIndex.value = previewList.value.indexOf(file.url)
  dialogVisible.value = true
}

// 清空fileList
const clearFileList = () => {
  fileList.value = []
  if (props.limit && props.limit > 1) {
    emits('update:modelValue', [])
  } else {
    emits('update:modelValue', '')
  }
}

// 隐藏上传
const disabled = computed(() => {
  return fileList.value.length === props.limit
})

const handleError = () => {
  ElMessage.error('上传失败，请联系客服')
}

// 超出限制提示
const handleExceed = () => {
  ElMessage.warning(`最多上传${props.limit}张图片`)
}

// 拖拽
const uploadRef = ref()
const initSort = () => {
  const el: any = document.querySelector('.el-upload-list')
  Sortable.create(el, {
    animation: 150,
    onEnd: (evt: any) => {
      const { oldIndex, newIndex } = evt
      // fileList.value.splice(oldIndex, 1)：从 fileList.value 数组中移除索引为 oldIndex 的元素，并返回一个包含该元素的数组
      // fileList.value.splice(newIndex, 0, ...)：在 fileList.value 数组的索引 newIndex 处插入之前移除的元素。
      fileList.value.splice(newIndex, 0, fileList.value.splice(oldIndex, 1)[0])
      emits(
        'update:modelValue',
        fileList.value.map((item) => item.url)
      )
    }
  })
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      console.log('newVal', newVal)
      if (Array.isArray(newVal)) {
        fileList.value = newVal.map((item: any) => {
          return {
            url: item
          }
        })
      } else {
        fileList.value = [{ url: newVal }]
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
)

defineExpose({ clearFileList })

onMounted(() => {
  initSort()
})
</script>

<template>
  <!-- 拖拽 -->
  <el-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    :action="props.url"
    list-type="picture-card"
    :class="{ disabled }"
    :limit="props.limit"
    multiple
    :style="{ '--width': props.width, '--height': props.height }"
    :before-upload="handleBefore"
    :on-preview="handlePictureCardPreview"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :on-error="handleError"
    :on-exceed="handleExceed"
  >
    <el-icon><Picture /></el-icon>
  </el-upload>
  <el-image-viewer
    v-if="dialogVisible"
    :teleported="true"
    :initial-index="initialIndex"
    @close="() => (dialogVisible = false)"
    :url-list="previewList"
    fit="cover"
  />
</template>

<style scoped lang="scss">
.preview {
  width: 100%;
  height: 100%;
}
// 上传样式
// 框架尺寸
:deep(.el-upload) {
  width: var(--width);
  height: var(--height);
  border-radius: 0;
  background-color: #ffffff;
}
// 框架的icon大小
:deep(.el-upload--picture-card .el-icon) {
  width: 20px;
  height: 20px;
  color: #cccccc;
}
// 添加图片后框架大小
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: var(--width);
  height: var(--height);
  border-radius: 0;
}
// 预览/删除的大小
:deep(.el-upload-list__item-actions) {
  font-size: 14px;
}
.preview {
  width: 100%;
  height: 100%;
}

// 限制一张隐藏框架
.disabled :deep(.el-upload--picture-card) {
  display: none;
}

// 隐藏删除提示
:deep(.el-icon--close-tip) {
  display: none !important;
}
.preview-wrapper {
  .preview-img {
    width: var(--width);
    height: var(--height);
    border: 1px solid #eee;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>
