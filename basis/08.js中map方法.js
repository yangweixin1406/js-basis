const arr = [1, 5, 6, 8, 10]

arr.map((item, index) => {
  console.log(item, index)
})

// reduce 让数组中的前项和后项做某种计算，并累计最终值
const num = arr.reduce((prev, next) => {
  return prev / next
})

console.log(num)