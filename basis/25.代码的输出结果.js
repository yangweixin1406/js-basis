/**
 * 单选题，输出结果
 */
const a = {}
const b = { key: 'b' }
const c = { key: 'c' }

a[b] = 123;
a[c] = 456;

// console.log(a[b])

/**
 * Set数据结构
 */
const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5])
// console.log(obj.hasOwnProperty('1'))
// console.log(obj.hasOwnProperty(1))
// console.log(set.has('1'))
// console.log(set.has(1))


/**
 * this指向输出
 */

var status = 'Window'

setTimeout(() => {
  const status = 'Settimeout'

  const data = {
    status: 'data',
    getStatus () {
      return this.status
    }
  }

  console.log(data.getStatus())
  console.log(data.getStatus.call(this))
})