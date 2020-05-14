/**
 * promise函数：
 * 1.promise是立即执行函数，直接new Promise里面的代码就会执行
 * 2.resolve和reject是回调函数，回调函数是异步执行的，promise是微任务，promise支持链式操作
 * 3.race([promise1, promise2, promise3]) race函数是执行多个promise函数，当一个执行完成则结束
 * 4.all([promise1, promise2, promise3]) all函数出发所有的promise函数执行
 */
function triggerPromise(params) {
  new Promise((resolve, reject) => {
    console.log(1233)
    resolve('943838838388383')
    reject('Data is undefined but render refrence during')
  }).then((res, err) => {
    console.log(res)
    console.log(err, 'err')
  }).catch(err => {
    console.log(err)
  })
}

// setTimeout(() => {
//   console.log('这里是外部setTimeout执行')
// }, 0)

// new Promise((resolve, reject) => {
//   // resolve('resolve函数执行')
//   setTimeout(() => {
//     console.log('内部setTimeout执行')
//     resolve('resolve函数执行')
//   }, 1000)
// }).then(res => {
//   console.log(res)
// })

/**
 * promise 状态存在一下三个值
 * 1.Pending 进行中
 * 2.Fulfilled 已完成
 * 3.Rejectecd 已失败
 * 状态只能从 pending变换为fulfilled 或者 pending变换为rejected,且状态改变不会再发生改变，会一直保持这个状态
 * 
 * resolve 把 pending 转换为 fulFilled, reject 把 pending 转换为 rejected
 */
// 判断变量是否是function
const isFunction = variable => { return typeof variable === 'function'}
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MyPromise {
  constructor (handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function parameter')
    }

    // 设置初始状态
    this._status = PENDING

    // 添加状态
    this._value = undefined

    // 添加成功回调队列
    this._fulfilledQueues = []

    // 添加失败回调队列
    this._rejectedQueues = []

    // 执行handle函数
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }

  // 添加reslove执行函数
  _resolve (val) {
    if (this._status !== PENDING) return
    const run = () => {
      // 依次执行成功队列中的函数，并清空队列
      const runFuLFilled = (value) => {
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(val)
        }
      }

      // 依次执行失败队列的函数，并清空队列
      const runRejected = (err) => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(err)
        }
      }

      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value
          this._status = FULFILLED
          runFuLFilled(value)
        }, err => {
          this._value = err
          this._status = REJECTED
          runRejected(err)
        })
      } else {
        this._status = FULFILLED
        this._value = val
        runFuLFilled(val)
      }
    }

    setTimeout(() => run(), 0)
  }

  // 添加reject执行函数
  _reject (err) {
    if (this._status !== PENDING) return
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(val)
      }
    }

    setTimeout(() => run(), 0)
  }

  // 添加then函数，支持链式调用，链式调用是上一个promise return出来一个promise,then返回一个promise对象
  then (onFulfilled, onRejected) {
    const { _value, _status } = this
    // 返回新的promise
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装成功的执行回调
      let fulFilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res = onFulfilled(value)
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回promise对象，必须等其状态改变后再执行下一个回调函数
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              // 否则将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的promise对象执行失败
          onRejectedNext(err)
        }
      }

      // 封装失败的执行函数
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          onRejectedNext(err)
        }
      }

      switch (_status) {
        case PENDING:
          this._fulfilledQueues.push(fulFilled)
          this._rejectedQueues.push(rejected)
          break
        case FULFILLED:
          fulFilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }

  // catch方法，只需要传递失败的回调函数
  catch (onRejected) {
    return this.then(undefined, onRejected)
  }

  // 静态resolve方法
  static resolve (value) {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }

  // 添加静态reject方法
  static reject (err) {
    return new MyPromise((resolve, reject) => reject(err))
  }

  // 添加静态all方法
  static all (list) {
    return new MyPromise((resolve, reject) => {
      /**
       * 返回值的集合
       */
      let values = []
      let count = 0
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(res => {
          values[i] = res
          count++
          // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
          if (count === list.length) resolve(values)
        }, err => {
          // 有一个被rejected时返回的MyPromise状态就变成rejected
          reject(err)
        })
      }
    })
  }
  // 添加静态race方法
  static race (list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }
  
  finally (cb) {
    return this.then(
      value  => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    );
  }
}
new MyPromise((resolve, reject) => {
  console.log(13333444445)
  resolve()
})