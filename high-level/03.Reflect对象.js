const obj = {
  name: 'Jack',
  age: 28,
  hobbies: '抽烟，喝酒，烫头'
}
const userInfo = new Proxy(obj, {
  get (target, key) {
    return Reflect.get(target, key);
  },
  deleteProperty (target, key) {
    return Reflect.deleteProperty(target, key);
  },
  has (target, key) {
    return Reflect.has(target, key);
  }
})
Function.prototype.apply.call(Math.floor, undefined, [1.75])
Reflect.apply(Math.floor, undefined, [1.75])


/**
 * 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver
 */
const myObject = {
  foo: 1,
  bar: 2,
  get bar() {
    return this.foo + this.bar;
  }
}

const myReceiverObject = {
  foo: 4,
  bar: 4
}

console.log(Reflect.get(myObject, 'bar', myReceiverObject))