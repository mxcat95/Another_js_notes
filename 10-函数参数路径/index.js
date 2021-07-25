// 函数参数对象
function foo(x, y) {
    console.log(x + y)
    console.log(arguments) // 1 2
    console.log(arguments.callee) // 指向函数本身
}
foo(1, 2)

// IIFE也可以找到函数本身
;
(function () {
    console.log(arguments.callee)
    // arguments.callee() 
})()

// 使用arguments实现一个 sum 函数，返回若干参数的和

function sum() {
    let s = 0

    for (let i = 0; i < arguments.length; i++) {
        s += arguments[i]
    }

    return s
}
console.log(sum()) // 0
console.log(sum(1)) // 1
console.log(sum(1, 2)) // 3
console.log(sum(1, 2, 3)) // 6

// 箭头函数没有arguments 如何处理不定参数？

// 使用扩展运算符
let print = (a, b, ...args) => {
    console.log(a, b, args)
}

print(1, 2, 3, 4, 5) // 1 2 [3,4,5]

let arr = [1, 2]
let brr = [3, 4]

print(0, ...arr, ...brr) // 0 1 [2,3,4]

// 解构赋值

let [z, x, c] = [1, 2, 3]
console.log(z, x, c) // 1 2 3

let obj = {
    name: '墨杉',
    sex: '男',
    saySome(...str) {
        console.log(...str)
    }
}

let {
    name,
    sex,
    saySome
} = obj

console.log(name, sex) // 墨杉 男
saySome('你好', '我在外面') // 你好 我在外面