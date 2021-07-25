let arr = [6]
console.log(arr.push(...[1, 2, 3, 4]))
console.log(arr)

// ES6 封装
function push(arr, ...rest) {

    // 新增长度
    let len = rest.length
    let oldLen = arr.length
    arr.length += len

    // 依次添加元素
    for (let i = oldLen; i < arr.length; i++) {
        arr[i] = rest[i - oldLen]
    }

    return arr.length
}

push(arr, '你好', '我好', '大家好')
console.log(arr)

// ES5 封装

function push1(arr) {

    // 需要添加的数目 除了第一个参数
    let len = arguments.length - 1
    let oldLen = arr.length
    arr.length += len

    for (let i = oldLen; i < arr.length; i++) {
        arr[i] = arguments[i - oldLen + 1] // 排出第0项
    }

    return arr.length
}

console.log(push1(arr, 9, 7, 8))
console.log(arr)

console.log(arr.pop()) // 8

// 自行封装一个 pop 方法
function pop(arr) {

    if (arr.length <= 0) {
        return undefined
    }

    let del = arr[arr.length - 1]

    arr.length--

    return del
}

console.log(pop(arr))
arr.pop()
arr.pop()
arr.pop()
arr.pop()

// 自行封装一个 unshift 方法
function unshift(arr, ...items) {

    // 需要添加的数目 除了第一个参数
    let len = items.length
    arr.length += len

    // 把原来的元素往后移
    for (let i = arr.length - 1; i > len; i--) {
        arr[i] = arr[i - len]
    }

    // 把新增的每一项依次添加到头部
    for (let i = 0; i < len; i++) {
        arr[i] = items[i]
    }

    return arr.length

}

unshift(arr, 3, 5, 9)
console.log(arr)

// 自定义数组shift方法
function shift(arr) {

    // 空数组返回undefined
    if (arr.length <= 0) {
        return undefined
    }

    let del = arr[0]

    // 数组项往前移动一位
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i + 1]
    }
    // 删除最后一项
    arr.length--

    return del
}

shift(arr)

console.log(arr.reverse())

// 自行封装 reverse 方法
function reverse(arr) {

    // let newArr = []

    // for (let i = 0; i < arr.length; i++) {
    //     newArr.unshift(arr[i])
    // }

    // return newArr

    // 以上经典的错误写法
    // 1.原数组没有改变；
    // 2.返回的是一个新数组;

    // 重新写

    let newArr = []

    // 先考备一份
    for (let i = 0; i < arr.length; i++) {
        newArr[i] = arr[i]
    }

    // 再重新排序
    for (let i = 0; i < arr.length; i++) {
        arr[i] = newArr[arr.length - 1 - i]
    }

    return arr
}

console.log(reverse(arr))

// forEach方法：
let pers = ['墨杉', '墨宝', '猫头']
pers.forEach(item => console.log(item + '帅')) // 每一项都加了个 '帅' 字

let nums = [1, -2, 2, -3, 3, -1, 4]
nums.forEach(item => {
    if (item > 0) {
        console.log(item)
    }
})

let nums1 = [1, 2, 3]

nums1.forEach(console.log) // 每一次都打印 元素 下标 数组

// 等价于

let log = console.log.bind(console)
nums1.forEach(log)

// 封装一个forEach方法
function forEach(arr, fn) {
    for (let index = 0; index < arr.length; index++) {
        fn(arr[index], index, arr)
    }
}

forEach(nums1, item => console.log(item * 2)) // 2 4 6

console.log(nums1.every(item => item > 0)) // true
console.log(nums1.some(item => item < 1)) // false

console.log(nums.filter(item => item > 0)) // [1,2,3,4]

// 查找水仙花数
// 初始化数组
let newarr = new Array(899).fill(0).map((item, index) => index + 100)
let shui = newarr.filter(item => {
    let num = `${item}`
    return num[0] ** 3 + num[1] ** 3 + num[2] ** 3 === item
})
console.log(shui) // [153,370,371,407]

// map方法
console.log(nums1.map(item => item * 2)) // [2,4,6]

// map方法封装
function map(arr, cb) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        newArr.push(cb(arr[i], i, arr))
    }
    return newArr
}
console.log(map(nums1, item => item * 2)) // [2,4,6]

// reduce方法：
let s = nums1.reduce((total, item) => {
    return total * item
}, 10)

console.log(s) // 60

// reduce方法封装：
function reduce(arr, cb, init) {

    // 统计结果
    let total

    // 传入初始值就用初始值 没有就用数组第一个元素
    if (init && typeof init !== undefined) {
        total = init
    } else {
        total = arr[0]
    }

    // 统计所有元素操作之后的结果
    for (let i = 0; i < arr.length; i++) {
        total = cb(total, arr[i], i, arr)
    }
    // 将结果返回
    return total
}

let ss = reduce(nums1, (total, item) => {
    return total * item
}, 10)
console.log(ss) // 60


// 面试题: 实现一个函数 
// 统计以下字符串每个字符出现的次数 并以对象的形式打印 { h: 3, d: 4 ... }
let str = 'dksajskldlkhdjskadhjkdsak'

// 函数封装
function statisticsStr(str) {

    let strArr = str.split('') // 转化为数组

    return strArr.reduce((total, item) => {

        // 初始化为一个对象 该对象内含有 字符串对应字符的属性 则加1 否则就添加属性；
        total[item] ? total[item]++ : total[item] = 1

        // 返回一个对象
        return total

    }, {})
}

console.log(statisticsStr(str))

// 上述代码超级简化版
const statisticsStrPlus = str =>
    str.split('').reduce((x, y) => ((x[y] ? x[y]++ : x[y] = 1), x), {})
// 这里涉及到一个细节： 逗号运算符 返回逗号右边的结果
// 例如： 2,3 => 3; let x = 2; (x++,x) => 3

// sort方法
let la = [1, 3, 5, 21, 23, 65, 321, 3, 36]
console.log(la.sort()) // 1 21 23 3 3 321 5 65 默认按照字符串编码排序

console.log(la.sort((v1, v2) => v1 - v2)) // 从小到大排序
console.log(la.sort((v1, v2) => v2 - v1)) // 从大到小排序

let flatArr = [1, 2, [3, 4],
    [1, [2, [8]]]
]

console.log(flatArr.flat(3))

// splice方法： 增删改查
let sl = ['你', '好', '吗']
sl.splice(1, 1, '吃', '了')
sl.splice(0, 2, '大', '家', '好')