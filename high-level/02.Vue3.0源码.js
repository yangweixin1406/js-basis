/**
 * vue 2 是 options api
 * vue 3 是 composition api
 */
// 原始 => 响应式
let toProxy = new WeakMap();
// 响应式 => 原始
let toRaw = new WeakMap();

let effectStack = []; // 存储effect的地方
let targetMap = new WeakMap(); // 特殊的对象 key是object

// 收集依赖
function track (target, key) {
  const effect = effectStack[effectStack.length - 1];
  // 最新的effect
  if (effect) {
    let depMap = targetMap.get(effect);
    if (depMap === undefined) {
      depMap = new Map();
      targetMap.set(target, depMap);
    }
    let dep = depMap.get(key) // obj.count  target是obj, key 是 count
    if (dep === undefined) {
      dep = new Set();
      depMap.set(key, dep);
    }
    // 双向存储
    if (!dep.has(effect)) {
      dep.add(effect);
      effect.deps.push(dep);
    }
  }
}

// 触发更新
function trigger (target, key, info) {
  // 寻找依赖 effect
  const depMap = targetMap.get(target);
  if (depMap === undefined) {
    return;
  }

  const effects = new Set();
  const computedRunners = new Set();

  if (key) {
    let deps = depMap.get(key);
    // deps里面全部effect
    deps.forEach(effect => {
      if (effect.computed) {
        computedRunners.add(effect);
      } else {
        effects.add(effect);
      }
    })
  }
  effects.forEach(effect => effect());
  computedRunners.forEach(computed => computed());
}


function computed (fn) {
  // 特殊的effect
  const runner = effect(fn, { computed: true, lazy: true });
  return {
    effect: runner,
    get value () {
      return runner();
    }
  }
}

function effect (fn, options = {}) {
  // 其实就是往 effectStack push了一个effect函数，执行fn
  // @todo 处理 options
  let e = createReactiveEffect(fn, options);
  if (!options.lazy) {
    e();
  }
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
  if (effectStack.indexOf(effect) === -1) {
    try {
      effectStack.push(effect);
      return fn(...args);
    } finally {
      effectStack.pop(); // effect用完就要推出去
    }
  }
}

const baseHandlers = {
  get(target, key) {
    // 收集依赖 track
    const res = Reflect.get(target, key);
    track(target, key);

    return typeof res === 'object' ? reactive(res) : res;
  },
  set(target, key, val) {
    const info = { oldValue: target[key], newValue: val };
    const res = Reflect.set(target, key, val);
    // 触发更新
    trigger(target, key, info);
    return res;
  }
}

// 响应式
function reactive (target) {
  // 首先查询缓存
  let observed = toProxy.get(target);
  // 判断是否已经被代理，相当于缓存，节省资源
  if (observed) return observed;

  if (toRaw.get(target)) return target;

  observed = new Proxy(target, baseHandlers);
  // 设置缓存
  toProxy.set(target, observed);
  toRaw.set(observed, target);
  return observed;
}
