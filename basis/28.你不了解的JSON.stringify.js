/**
 * 了解JSON.stringify
 */

// 不改变属性值的情况下，改变属性名，改为驼峰命名
const todayILearn = {
  _id: 1,
  content: '今天我学习了javascript, css, html',
  created_at: '2020/08/09',
  updated_at: '2020/09/09'
}
// JSON.parse(JSON.stringify(todayILearn).replace(/_id|created_at|updated_at/, matched => mapObj[matched]))

/**
 * JSON.stringify的九大特性
 */
/**
 * 一.对于undefined，任意函数以及symbol三个值分别作为对象属性的值,数组元素，单独的值时JSON.stringify将返回不同的结果
 */
// 对于undefined，任意函数和symbol作为属性值时，会跳过对他们的序列化
const data = {
  a: 'aaa',
  b: undefined,
  c: Symbol('dd'),
  fn: function () {
    return true
  }
}

// 对于undefined，任意函数和symbol作为数组元素时，JSON.stringify会把他们序列化为null
const jsonArr = JSON.stringify(['aaa',undefined, function() { return true }, Symbol('bb')])

/**
 * 二.非数组对象的属性不能保证以特定的顺序出现在序列后的字符串中，因为对象可能存在undefined，任意函数或者symbol，所以对象无法以特定顺序出现
 */

/**
 * 三.对象中如果有toJSON函数，该函数返回什么值，序列化结果就是什么值，并忽略其他属性的值
 */
const json3 = {
  say: 'Hello JSON.stringify',
  toJSON: function () {
    return 'today I learn'
  }
}
JSON.stringify(json3)

/**
 * 四.JSON.stringify会正常的序列化date
 */
const dateJson = JSON.stringify({
  now: new Date()
})

/**
 * 五.NaN,infinity格式的数值及null都会被当作null
 */
// console.log(JSON.stringify(NaN))
// console.log(JSON.stringify(Infinity))
// console.log(JSON.stringify(null))

/**
 * 六.基本类型序列化，布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值
 */
const baseJson = JSON.stringify([new Number(1), new String('false'), new Boolean(false)])

/**
 * 七，仅会序列化可枚举的属性
 */
const enumJson = JSON.stringify(Object.create(null, {
  x: { value: 'name', enumerable: false },
  y: { value: 'my name is', enumerable: true }
}))

/**
 * 八.序列化实现深拷贝，遇到循环引用对象会报错
 */

/**
 * 九.以symbol为属性的键都会被忽略，无论指定还是未指定
 */


/**
 * JSON.stringify 第二个参数和第三个参数
 * 第二个参数可以是一个函数或者数组
 */
const paramJson = JSON.stringify(data, (key, value) => {
  switch (true) {
    case typeof value === 'undefined':
      return 'undefined';
    case typeof value === 'symbol':
      return value.toString()
    case typeof value === 'function':
      return value.toString()
    default:
      break
  }
  return value
})

// 传入replacer的第一个参数
const data1 = {
  a: 2,
  b: 3,
  c: 4,
  d: 5
}
const data1Json = JSON.stringify(data1, (key, value) => {
  return value
})

// 实现map函数
const mapObj = (obj, fn) => {
  if (typeof fn !== 'function') {
    throw new Error(`${fn} is not a function`)
  }
  return JSON.parse(JSON.stringify(obj, fn))
}

const mapJSON = mapObj(data1, (key, value) => {
  if (value % 2 === 0) {
    return value / 2
  }
  return value
})

// replacer作为数组时，就是将数组中的值，作为对象中需要序列化的属性值
const jsonObj = {
  name: 'Jack',
  params: 'I am a param'
}
const jsonTwoParams = JSON.stringify(jsonObj, ['name', 'params'])


/**
 * 第三个参数，有意思，却没啥用
 */