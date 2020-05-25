/**
 * 创建链表
 */

function LinkedList() {
  let Node = function (ele) {
    this.ele = ele;
    this.next = null;
  }
  let length = 0;
  let head = null;

  // apped 在队尾插入
  this.append = function (ele) {
    let node = new Node(ele), current;
    // 判断是否有头部
    if (head === null) {
      // 链表中第一个节点
      head = node
    } else {
      current = head
      // 循环链表，直到找到最后一行
      while (current.next) {
        current = current.next
      }
      // 找到最后一项，将其next赋值为node，建立连接
      current.next = node
    }
    // 更新链表长度
    length++;
  };
  // insert 指定位置插入
  this.insert = function (position, ele) {
    if (position >= 0 && position <= length) {
      let node = new Node(ele), current = head, previous, index = 0;
      // 在第一个位置添加
      if (position === 0) {
        node.next = current;
        head = node;
      } else {
        while (index++ < length) {
          previous = current;
          current = current.next;
        }
        previous.next = node;
        node.next = current
      }
      length++
      return true;
    } else {
      return false;
    }
  }
  // 删除指定位置数据
  this.removeAt = function (position) {
    // 边界检查，判断index是否合规
    if (position > -1 && position < length) {
      let current = head, previous, index = 0;
      if (position === 0) {
        head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        // 将previous和current的下一项链接起来，跳过current，从而移除它
        previous.next = current.next;
      }
      length--;
      return current.ele
    } else {
      return null;
    }
  }
  // 移除链表中一项
  this.remove = function (ele) {
    let index = this.indexOf(ele)
    return this.removeAt(index)
  }
  // 返回传入值下标，如果没有返回-1
  this.indexOf = function (ele) {
    let current = head, index = 0;
    while (current) {
      if (ele === current.ele) {
        return index;
      }
      index ++
      current = current.next;
    }
  }
  // 判断链表是否为空
  this.isEmpty = function () {
    return length === 0;
  }
  // 返回链表长度
  this.size = function () {
    return length;
  }
  // 获取头部
  this.getHead = function () {
    return head;
  }
  // 转化为字符串
  this.toString = function () {
    let current = head, string = '';
    while (current) {
      string += current.ele + (current.next ? 'n' : '');
      current = current.next;
    }
    return string;
  }
  // 打印
  this.print = function () {}
}

const list = new LinkedList()
list.append(10)
console.log(list)