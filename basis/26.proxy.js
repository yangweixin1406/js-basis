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

/**
 * 负索引数组
 */
const navigateArray = (els) => new Proxy(els, {
  get: (els, propKey, reciver) => Reflect.get(els, (+propKey < 0) ? String(els.length + +propKey) : propKey, reciver)
})

const unicorn = navigateArray(['Jack', 'name', 'sub'])
console.log(unicorn[-2])

/**
 * 隐藏属性
 */
const hide = (target, prefix = '_') => new Proxy(target, {
  has: (obj, prop) => (!prop.startsWith(prefix) && prop in obj),
  ownKeys: (obj) => Reflect.ownKeys(obj).filter(prop => (typeof prop !== 'string') || !prop.startsWith(prefix)),
  get: (obj, prop, rec) => (prop in rec) ? obj[prop] : undefined
})

const hideValue = hide({ name: 'Jack', age: '18', _love: 'moumou' })

/**
 * 缓存
 */
const ephemeral = (target, ttl = 60) => {
  const CREATE_AT = Date.now()
  const isExpired = () => (Date.now() - CREATE_AT) > (ttl * 1000)

  return new Proxy(target, {
    get: (obj, prop) => isExpired() ? undefined : Reflect.get(obj, prop)
  })
}

let bankAccount = ephemeral({
  balancd: 14.93
}, 10)
// console.log(bankAccount.balancd)

// setTimeout(() => {
  // console.log(bankAccount.balancd)
// }, 10 * 1000)

/**
 * 枚举和只读视图
 */

// 只读视图
const NOPE = () => {
  throw new Error('Can not modify read-only view');
}

const NOPE_HANDLE = {
  get: NOPE,
  defineProperty: NOPE,
  deleteProperty: NOPE,
  preventExtension: NOPE,
  setPropertyOf: NOPE
}

const readOnlyView = target => new Proxy(target, NOPE_HANDLE);

// 枚举试图
const createEnum = target => new Proxy(target, {
  get: (obj, prop) => {
    if (prop in obj) {
      return Reflect.get(obj, prop)
    }
    throw new Error(`Can not find prop ${prop}`)
  }
})
const enumObj = createEnum({
  name: 'Jack',
  age: 18
})

/**
 * 运算符重载
 */
const range = (min, max) => new Proxy(Object.create(null), {
  has: (_, prop) => (+prop >= min && +prop <= max)
})

const nums = [4, 6, 10, 80]
const x = 10;

/**
 * Cookie对象
 */
const getCookieObject = () => {
  const cookies = document.cookie.split(',').reduce((cks, ck) => 
  ({ [ck.substr(0, ck.indexOf('=')).trim()] : ck.substr(ck.indexOf('=') + 1), ...cks }), {})
}