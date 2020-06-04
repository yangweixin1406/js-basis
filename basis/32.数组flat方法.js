/**
 * 实现flat方法
 */
const arr = [1, 2, 4, [5, 9, 0, [3, 0]], [2, 'see', 9, ['cake', function () { alert(123) }]], { name: 'Jack' }];

const flat = arr => {
  const newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      newArr.push(...flat(arr[i]));
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

console.time('start');
// console.log(flat(arr));
console.timeEnd('start');

/**
 * 使用reduce实现flat函数
 */
const reduceFlat = arr => {
  return arr.reduce((t, v) => (v instanceof Array ? t.push(...reduceFlat(v)) : t.push(v), t), [])
}

String(["🐷", ["🐶", "🐂"], ["🐎", ["🐑", ["🐲"]], "🐛"]]).split(',')

console.time('start');
console.log(reduceFlat(arr));
console.timeEnd('start');