const dayWork = new Array(1);

const day = [1, 2, 3, 4, 5, 6]


delete day[0]

/**
 * 迭代器函数
 */

const isEven = function (x) {
  return x % 2 === 0
}

const nums = [1, 2, 4, 7, 9, 8, 23, 20]

console.log(nums.every(isEven))
console.log(nums.some(isEven))
console.log(nums.map(isEven))
console.log(nums.filter(isEven))
console.log(nums.reduce((a, b) => a + b))