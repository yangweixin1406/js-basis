function Queue () {
  let items = [];

  this.enqueue = function (ele) {
    items.push(ele);
  }

  this.dequeue = function (ele) {
    return items.shift()
  }

  this.front = function () {
    return items[0]
  }

  this.isEmpty = function () {
    return items.length === 0
  }

  this.size = function () {
    return items.length
  }

  this.print = function () {
    console.log(items.toString())
  }
}

let queue = new Queue();
console.log(queue.isEmpty())