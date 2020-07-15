console.log(1 + "2" + "2"); // 122

console.log(1 + +"2" + "2"); // 32

console.log(1 + -"1" + "2"); // 02

console.log(+"1" + "1" + "2"); // 112

console.log( "A" - "B" + "2"); // NaN2

console.log( "A" - "B" + 2); // NaN

console.log('A' + 'B' - '2') // NaN


/**
 * ++a 和 a++ 的区别
 */
var a = 666;

console.log(++a); // 667
console.log(a++); // 667
console.log(a); // 668

/**
 * 函数声明和变量提升  函数声明 > arguments > 变量提升
 */
console.log(typeof b);
function b () {}
var b;
console.log(typeof b);


/**
 * function 作为判断条件
 */
var x = 1;

if (function f() {}) {
  x += typeof f;
}

console.log(x)

/**
 * ++ 运算符
 */
var str = '123abc';
console.log(typeof str++);

/**
 * for...in..遍历
 */

Object.prototype.bar = 1;

var foo = {
  moo: 2
}

for (var i in foo) {
  console.log(i);
}


/**
 * return 用法
 */

function foo1 () {
  return {
    bar: 'Hello'
  }
}

function foo2 () {
  return
  {
    bar: 'foo'
  }
}

console.log(foo1());
console.log(foo2());
