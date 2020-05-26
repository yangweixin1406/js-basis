/**
 * proxy 在目标对象架设之前进行一层拦截
 */
let target = {
  x: 10,
  y: 20
}
let handler = {
  get: (obj, prop) => 40
}
const proxy = new Proxy(target, handler);

const withZeroValue = (target, zeroValue) => new Proxy(target, {
  get: (obj, prop) => obj.hasOwnProperty(prop) ? obj[prop] : zeroValue
})

const pos = withZeroValue(target, 'My name is Tom, you are Jerry.')
console.log(pos.x, pos.y, pos.z)