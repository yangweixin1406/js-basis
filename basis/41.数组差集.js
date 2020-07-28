const arr1 = [1, 2, 3, 4, 5, 8, 9];
const arr2 = [5, 6, 7, 8, 9];

const diff = arr1.filter(item => !new Set(arr2).has(item));

console.log(diff);