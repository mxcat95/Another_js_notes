let obj = {
    name: '墨杉',
    age: 18
}

console.log(obj.name) // 墨杉
console.log(name) // "" 这是window对象下面的全局属性 默认为空 表示该页面的名字
// 等价于：
console.log(window.name) // ""

console.log(typeof null)
console.log(typeof obj)

console.log(null == obj)


// 对象查询：
let age = 'age'

console.log(obj.age)
console.log(obj[age])
console.log(obj['age'])
console.log(obj['a' + 'g' + 'e'])
// 都能访问到对象的年龄属性

// 对象属性添加
let num = 'lala';
obj.sex = '男'
obj[num] = 11
obj['tab'] = '哈哈哈'

// 删除属性：
delete obj.age
delete obj[num]

// 特殊的对象 数组 类数组对象
let arr = ['风雅', '赞颂', '深思', '熟虑']
console.log(typeof arr) // object
console.log(arr)

// 类数组对象

let likeObj = {
    0: '你',
    1: '好',
    2: '世',
    3: '界',
    length: 4
}

console.log(typeof likeObj) // object
console.log(likeObj)