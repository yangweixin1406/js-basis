// const add = a => b => c => a + b + c;


// function curry (a) {
//   return function (b) {
//     return function (c) {
//       return a + b + c
//     }
//   }
// }
// console.log(curry(3)(7)(8))

// // 示意函数
// function ajax(type, url, data) {
//   const xhr = new XMLHttpRequest()
//   xhr.open(type, url, true)
//   xhr.send(data)
// }

// ajax('POST', '/getList', {name: 'Jack'})
// ajax('GET', '/getList', {name: 'Jack'})
// ajax('DELETE', '/deleteList', {name: 'Jack'})

// // 利用curry
// const ajaxCurry = curry(ajax)

// const post = ajaxCurry('POST')
// post('/getList', {name: 'Jack'})

// const postFormmTest = post('www.baidu.com')
// postFormmTest({ name: 'Jack' })

// const person = [{ name: 'Jack' }, { name: 'Tom' }]
// const name = person.map(item => {
//   return item.name
// })
// console.log(name)

// const prop = curry((key, obj) => {
//   return obj[key]
// })
// const name1 = person.map(prop['name'])
// console.log(name1)

// 柯里化方法实现,函数柯里化实现第一版
const curry1 = function (fn) {
  // arguments是类数组，有length属性，切割方法后面的参数
  const args = [].slice.call(arguments, 1)
  return function () {
    // arguments 为当前调用这个函数传递进来的参数
    const newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs);
  }
}

const add = function (a, b) {
  return a + b;
}

const addCurry = curry1(add, 1, 2)
console.log(addCurry())

const addCurry1 = curry1(add, 1)
console.log(addCurry1(4))

const addCurry2 = curry1(add)
console.log(addCurry2(4, 9))

/**
 * 
 * @param {function} fn 
 * 函数柯里化第二版实现
 */
const sub_curry = function (fn) {
  const args = [].slice.call(arguments, 1)
  return function () {
    const newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

const curry2 = function (fn, length) {
  length = length || fn.length
  const slice = Array.prototype.slice
  return function () {
    if (arguments.length < length) {
      const combined = [fn].concat(slice.call(arguments))
      return curry2(sub_curry.apply(this, combined), length - arguments.length)
    } else {
      return fn.apply(this, arguments)
    }
  }
}

const fn = curry2((a, b, c) => {
  return [a, b, c]
})
console.log(fn('a', 'b', 'c'))
console.log(fn('a', 'b')('c'))
console.log(fn('a')('b', 'c'))
console.log(fn()('a', 'b', 'c'))

/**
 * @param {*} fn 
 * @param {*} args
 */
const curry3 = function (fn, args) {
  const length = fn.length
  const args = args || []
  return function () {
    // 把类数组转换为数组
    const _args = args.slice(0), arg, i;
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i]
      _args.push(arg)
    }
    if (_args.length < length) {
      return curry3.call(this, fn, _args)
    } else {
      return fn.apply(this, _args)
    }
  }
}