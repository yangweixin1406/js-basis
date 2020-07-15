/**
 * 数组操作
 */

// 生成1-100个数
const arr = new Array(100).fill(0).map((item, index) => index + 1);

const arr1 = Array.from(Array(100), (v, k) => k + 1);


const [a, b] = [100, 300];

const arr3 = [1, 2, 5, 8];
const arrObj = { ...arr3 };
