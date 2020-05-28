/**
 * 数组 forEach, map, filter, find使用场景及方法
 */
const objArr = [
  { name: 'Jack', age: 15, sex: '男' },
  { name: 'Sunny', age: 18, sex: '男' }
]
objArr.forEach((item, index, originArr) => {
  // console.log(item, 'item')
  // console.log(index, 'index')
  // console.log(originArr, 'originArr')
})

/**
 * map方法的使用,遍历数组中的对象，可以以数组方式返回对象中的属性
 */
const newArr = objArr.map(({ age }, index, originArr) => {
  return age
}).reduce((a, b) => a + b)

/**
 * filter方法，会返回一个新数组,新数组包含符合条件的item，过滤在有些场景很实用
 */
const filterArr = objArr.filter((item, index, arr) => {
  return item.age === 15 || item.age === 18
})

// 假设有两个对象，根据A中id值，过滤掉B中不符合的数据
const info = { id: 4, content: 'Javascript' }

const languages = [
  { id: 1, content: 'Angular' },
  { id: 4, content: 'Vue', author: '尤雨溪' },
  { id: 3, content: 'Node' },
  { id: 4, content: 'React' }
]

const filterFun = function (info, languages) {
  return languages.filter( language => {
    return language.id === info.id
  } )
}

/**
 * find方法,返回第一个查询到的数据
 */

const findArr = languages.find(item => {
  return item.id === 4
})
console.log(findArr)