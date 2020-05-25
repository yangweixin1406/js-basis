/**
 * 箭头函数没有 prototype,所以箭头函数没有this
 */
let a = () => { }

/**
 * 箭头函数的this指向继承自外层第一个普通函数的this
 */

 let b, barObj = { msg: '这是bar的this指向' }, fooObj = { msg: '这是foo的this指向' }

 bar.call(barObj)
 foo.call(fooObj)

 function foo () {
   b()
 }

 function bar () {
   b = () => {
     console.log(this, 'this指向外层的第一个普通函数')
   }
 }

 /**
  * 数组解构
  */

const [name, age, sex] = [100, 399, 'Jscl']
const obj = { name, age, sex }
console.log(obj)