<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Sortable from 'sortablejs'

const tableData = ref([
  { id: 1, name: '张三', age: 18 },
  { id: 2, name: '李四', age: 19 },
  { id: 3, name: '王五', age: 20 }
])

const initialSortable = () => {
  // 父容器元素
  const el: any = document.querySelector('tbody')
  Sortable.create(el, {
    animation: 150,
    onEnd: (evt: any) => {
      const { oldIndex, newIndex } = evt
      tableData.value.splice(newIndex, 0, tableData.value.splice(oldIndex, 1)[0])
      console.log(oldIndex, 'oldIndex')
      console.log(newIndex, 'newIndex')
    }
  })
}

onMounted(() => {
  initialSortable()
})
</script>

<template>
  <el-table
    class="mt-10"
    :data="tableData"
    :header-cell-style="{
      'text-align': 'center',
      'background-color': '#f6f6f6',
      color: '#333'
    }"
    :cell-style="{ padding: '0', 'text-align': 'center', height: '50px', color: '#333' }"
    row-key="id"
    border
  >
    <el-table-column label="名称" prop="name" width="200" />
    <el-table-column label="年龄" prop="age" />
  </el-table>
</template>

<style scoped lang="scss"></style>
