let box = document.querySelector('.box')

box.onclick = () => {
    box.style.width = '500px' // 点击盒子 变宽

    box.style.height = '500px' // 变高

    box.style.backgroundColor = 'blanchedalmond' // 更改背景颜色

    // 复原
    setTimeout(() => {
        // 另一种写法 使用模板字符串拼接 更简洁
        box.style.cssText = `
            width: 400px;
            height: 400px;
        `
        // 属性设置的写法
        box.setAttribute('style', 'background-color: #ccfc')
    }, 3000)
}

let x = 1,
    y = 2

function add(s, x, y) {
    console.log(s, x + y) // [ "你好！计算结果是：", ",", "",lenth: 3 ] 3
    console.log(arguments) // [ ["你好！计算结果是：", ",", ""],1,2,callee: add, lenth:3] ] 
}

// 模板字符串还能运行函数
add `你好！计算结果是：${x},${y}` // 参数是一个类数组对象 

// 字符串的length属性

let str = '1234567'
console.log(str.length) // 7
console.log(typeof typeof str.length) // string

let a
console.log(a) // 未初始化的 已经存在的变量 即undefined

let obj = {}
console.log(obj.a) // 访问不存在的属性 也是undefined

// 显示赋值一个变量为undefined
let undif = undefined
console.log(typeof undif) // undefined
console.log(typeof typeof undif) // string 凡是在控制台输出的白色的值 都是字符串

try {
    console.log(undif.b)
} catch (error) {
    console.log(error) // TypeError: Cannot read property 'b' of undefined
}

console.log(typeof null) // object 空对象
let obje = null
console.log(obje) // null
obje = {
    x: 1
}
console.log(obje) // {x: 1}
obje = null // 清空
console.log(obje) // null

// 对象的写法

let person = {
    name: '墨杉',
    age: 25,
    sex: '男',
    isMerryed: false,
    son: null,
    "收入": undefined,
    sayName: function () {
        console.log(this.name)
    },
    165: 'cm'
}

// 对象的访问

console.log(person.name) // 墨杉
console.log(person["name"]) // 墨杉
person.sayName() // 墨杉
console.log(person["收入"]) // undefined

let name = "age"
console.log(person[name]) // 25 
// 等价于
console.log(person["age"]) // 25

console.log(person[100 + 60 + 5]) // "cm"