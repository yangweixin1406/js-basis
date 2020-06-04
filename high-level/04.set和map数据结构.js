/**
 * set本身是个构造函数，用来生成Set数据结构
 */
const s = new Set();

[2, 3, 4, 2, 5, 8, 4].forEach(x => s.add(x));

/**
 * Set可以接收数组作为参数
 */

const mySet = new Set([2, 5, 6, 9, 2]);
// 去除数组中重复元素
// console.log([...mySet])

// 去重字符串重复的字符
// console.log([...new Set('aabcdm')].join(''))

// Array.from可以把Set结构转换为数组
const transferS = Array.from(s);

// 去除数组重复元素的方法
const dedupe = arr => Array.from(new Set(arr));

dedupe([2, 3, 4, 2, 6, 6]);

// Set遍历操作, 返回的都是遍历器对象
s.values()

/**
 * WeakSet 的成员只能是对象，不能是其他值
 */



console.log(new Map([['name', '张三'], ['age', 28]]));