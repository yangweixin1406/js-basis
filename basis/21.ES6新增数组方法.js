const numbers = [1, 2, 3, 4, 5]
let iterator = numbers[Symbol.iterator]();
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

let entris = numbers.entries();
// console.log(entris.next())
// console.log(entris.next())
// console.log(entris.next())
// console.log(entris.next())
// console.log(entris.next())
// console.log(entris.next())

let akeys = numbers.keys()
// console.log(akeys.next())
// console.log(akeys.next())
// console.log(akeys.next())
// console.log(akeys.next())
// console.log(akeys.next())
// console.log(akeys.next())

// let avalues = numbers.values()
// console.log(avalues.next())
// console.log(avalues.next())
// console.log(avalues.next())
// console.log(avalues.next())
// console.log(avalues.next())
// console.log(avalues.next())

let numbers2 = Array.from(numbers)

console.log(numbers.copyWithin(0, 3))


const nums = [1, 3, 5, 7, 9, 8, 10]

console.log(nums.toString())