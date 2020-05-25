function Set() {
  this.items = {}

  // 向集合中添加一个新的项
  this.add = function (val) {
    if (!this.has(val)) {
      items[val] = val;
      return true;
    } else {
      return false;
    }
  }
  // 从集合中移除一个值
  this.remove = function (val) {
    if (!this.has(val)) {
      delete items[val]
      return true;
    } else {
      return false;
    }
  }
  // 值是否在集合中，如果在返回true， 否则返回false
  this.has = function (val) {
    return items.hasOwnProperty(val)
  }
  // 清空集合中所有项
  this.clear = function () {
    items = {}
  }
  // 集合长度
  this.size = function () {
    return Object.keys(items).length;
  }
  // 返回集合中所有值的数组
  this.values = function () {
    return Object.values(items);
  }
}