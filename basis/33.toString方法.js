console.log(false.toString());
console.log([1, 2, 3].toString());
console.log([1, 2, 3, undefined].toString());
console.log([1, 2, 3, undefined, NaN, null, function () {}, false, true].toString())
console.log(NaN.toString());
console.log(1 .toString());
console.log(20..toString());
console.log(Object.prototype.toString.call({}).slice(8, -1));