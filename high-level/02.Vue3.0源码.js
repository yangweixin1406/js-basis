/**
 * vue 2 是 options api
 * vue 3 是 composition api
 */
// 原始 => 响应式
let toProxy = new WeakMap();
// 响应式 => 原始
let toRaw = new WeakMap();

let effectStack = [];
let targetMap = new WeakMap(); // 特殊的对象 key是object

// 收集依赖
function track () {

}

// 触发更新
function trigger () {

}

function effect (fn, options = {}) {
  // @todo 处理 options
  let e = createReactiveEffect(fn, options);
  return e;
}

function createReactiveEffect (fn, options) {
  // 构造effect
  const effect = function effect (...args) {
    return run(effect, fn, args);
  }
  effect.deps = [];
  effect.computed = options.computed;
  effect.lazy = options.lazy;
  return effect;
}

function run (effect, fn, args) {

}

const baseHandlers = {
  get(target, key) {
    // 收集依赖 track
    track(target, key);
    const res = Reflect.get(target, key);

    return typeof res === 'object' ? reactive(res) : res;
  },
  set(target, key, val) {
    const res = Reflect.set(target, key, val);
    // 出发更新
    return res;
  }
}

// 响应式
function reactive (target) {
  // 首先查询缓存
  let observe = toProxy.get(target);
  if (observed) return observed;

  if (toRaw.get(target)) return target;

  observed = new Proxy(target, baseHandlers);
  // 设置缓存
  toProxy.get(target, observed);
}

function computed () {

}