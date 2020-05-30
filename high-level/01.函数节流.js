/**
 * 
 * @param {*} fn 
 * @param {*} interval 
 * 
 * 节流也就是说每多少秒出发一次，类似于地铁，停留的时间是相同的，期间不管上了多少人，只要到时间就走
 */
const throttle = function (fn, interval = 500) {
  let _self = fn, timer, firstTime = true;
  // 闭包
  return function () {
    var args = arguments, _me = this;

    // 如果是第一次点击，不需要延迟执行
    if (firstTime) {
      _self.apply(_me, args)
      return firstTime = false;
    }

    // 如果存在计时器，则同样继续执行
    if (timer) {
      return false;
    }

    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      _self.apply(_me, args);
    }, interval)
  }
}

window.onresize = throttle(() => {
  console.log(1233)
}, 200)