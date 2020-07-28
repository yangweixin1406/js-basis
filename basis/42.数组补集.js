const arr1 = [1, 2, 3, 4, 5, 8, 9];
const arr2 = [5, 6, 7, 8, 9];

const diff = Array.from(arr1.concat(arr2).filter(v => !new Set(arr1).has(v) || !new Set(arr2).has(v)));

console.log(diff);