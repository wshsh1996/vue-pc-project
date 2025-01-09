// 下面是一个函数进行随机数生成  第一个参数所需字符串长度   第二个参数需要生成的数量 这里只是复制进来的 改的话直接删除export就行了
export const getRandomUniqueIndexes = (max: number, count: number) => {
  if (count > max) return []
  const indexes: number[] = []
  // 使用 while 循环，直到 indexes 数组中的元素数量达到 count
  while (indexes.length < count) {
    // 在每次循环中，生成一个范围在 0 到 max-1 之间的随机整数 randomIndex
    const randomIndex = Math.floor(Math.random() * max)
    // 检查 randomIndex 是否已经在 indexes 数组中，如果不在，则将其添加到数组中
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex)
    }
  }
  // 返回包含 count 个唯一随机索引的数组
  return indexes
}
