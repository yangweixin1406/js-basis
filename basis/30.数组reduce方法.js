/**
 * 强大的数组 reduce 方法
 * reduce 方法有五个参数  arr.reduce((t, v, i, a) => {}, initValue)
 * 回调函数：
 *   callback: 必选参数
 *   initValue: 初始值，可选参数，指定累加器的开始值
 * 回调函数参数:
 *   t(total): 累加结束返回的值，总值
 *   v(value): 遍历当前的值
 *   i(index): 当前值的下标
 *   a(arr): 当前遍历的元素所属的数组对象
 * 
 * 1.如果有初始值，sum会等于初始值，循环从下标0开始，如果没有初始值则初始值为 sum = arr[0],循环从下标1开始
 * 2.reduce()对空数组无效
 */
const sum = [3, 5, 8].reduce((sum, item, index, arr) => {
}, 0)


/**
 * 高级用法
 */

// 一.累加累乘
function AccountLation (...vals) {
  return vals.reduce((t, v) => t + v, 0)
}

function Multiplication (...vals) {
  return vals.reduce((t, v) => t * v, 1)
}
AccountLation(1, 2, 5, 8, 5)
Multiplication(1, 2, 5, 8, 5)

// 二.权重求和
const scores = [
  { score: 90, subject: 'Chinese', weight: 0.5 },
  { score: 95, subject: 'math', weight: 0.3 },
  { score: 85, subject: 'English', weight: 0.2 }
]
const result = scores.reduce((t, v) => t + v.score * v.weight, 0)

// 三.代替reverse, reduceRight是降序遍历
const Reserve = function (arr = []) {
  return arr.reduceRight((t, v) => (t.push(v), t), [])
}
Reserve([1, 9, 0, 5, 4])

// 四.代替map和filter，强大的方法, 牛批，学习了
const arr = [1, 3, 5, 8]
// 代替map[2, 4, 10, 16]
const a = arr.map(v => v * 2)
const b = arr.reduce((t, v) => [...t, v * 2], [])

// 代替filter, 妙啊
const c = arr.filter(v => v > 3)
const d = arr.reduce((t, v) => v > 3 ? [...t, v] : t, [])

// 代替map和filter链式操作，无敌了
const e = arr.map(v => v * 2).filter( v => v > 2)
const f = arr.reduce((t, v) => v * 2 > 2 ? [...t, v * 2] : t, [])

// 五.代替some和every
const scores1 = [
  { score: 50, subject: 'Chinese' },
  { score: 90, subject: 'Math' },
  { score: 59, subject: 'English' }
]
// 代替some，至少有一门课几个
const someRes = scores1.reduce((t, v) => t || v.score >= 60, false)
// 代替every,全部及格
const everyRes = scores1.reduce((t, v) => t && v.score >= 60, true)

// 六：数组分割, 很强，一些算法会用到这些
function Chunk (arr = [], size = 1) {
  return arr.length ? arr.reduce((t, v) => (t[t.length - 1].length === size ? t.push([v]) : t[t.length - 1].push(v), t), [[]]) : [];
}
const chunkArr = Chunk([1,4, 5, 9, 7, 0], 3);

// 七.数组过滤
function difference (arr = [], oarr = []) {
  return arr.reduce((t, v) => (!oarr.includes(v) && t.push(v), t), [])
}
const diffArr = difference([1, 2, 3, 4, 5], [2, 4, 6])

// 八.数组扁平
const Flat = function (arr = []) {
  return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), [])
}
const flatArr = Flat([[1, 4], [1, 6, [7, 0, [19, 10]]]])

// 九.数组去重
function Uniq (arr = []) {
  return arr.reduce((t, v) => t.includes(v) ? t : [...t, v], [])
}
const uniqArr = Uniq([1, 1, 3, 9, 4, 5, 4])

// 十.数组的最大值和最小值
function Max (arr = []) {
  return arr.reduce((t, v) => t > v ? t : v)
}
function Min (arr = []) {
  return arr.reduce((t, v) => t > v ? v : t)
}
Max([2, 8, 10, 4])
Min([2, 8, 10, 4])

// 十一.数组成员独立拆解
function Unzip(arr = []) {
  return arr.reduce(
    (t, v) => (v.forEach((w, i) => t[i].push(w)), t),
    Array.from({ length: Math.max(...arr.map(v => v.length)) }).map(v => [])
  )
}
const unzipArr = [['a', 1, true], ['b', 2, false]];

// 十二.数组成员个数统计
function Count (arr = []) {
  return arr.reduce((t, v) => (t[v] = (t[v] || 0) + 1, t), {})
}

// 十三.数组成员位置记录
function Position(arr = [], val) {
  return arr.reduce((t, v, i) => (v === val && t.push(i), t), [])
}
Position([1, 3, 4, 6, 8, 2, 1, 4], 1)

// 十四.数组成员所含关键字统计

// 异步累计
async function AsyncTotal (arr = []) {
  return arr.reduce(async(t, v) => {
    const at = await t;
    const todo = await Todo(v);
    at[v] = todo;
    return at;
  }, Promise.resolve({}));
}

const asyncRes = await AsyncTotal([1, 3, 4]);