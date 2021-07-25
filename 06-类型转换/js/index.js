// 类型转换

console.log(3 + '2') // "32" 将数字转化为字符串 然后拼接
console.log('32' - 2) // 30 将字符串转化为数字 然后相减

// 转换为布尔类型
function tOrf(o) {
    return !(!o)
}

// 对象转为字符串

let obj = {
    x: 1,
    y: 2
}
console.log(Number(obj)) // NaN

// 但是 如果对象实现了toString方法 或者 valueOf方法：
let objToStr = {
    x: 1,
    y: 2,
    toString: function () {
        return this.x + this.y
    }
}
console.log(Number(objToStr)) // 3

let objValueOf = {
    x: 1,
    y: 2,
    toString: function () {
        return this.x + this.y
    },
    valueOf: function () {
        return this.x * this.y
    }
}
console.log(Number(objValueOf)) // 2 会优先调用valueOf方法；

// 面试题： 请实现一个对象o 输出 "执行"
// 分析： 乍一看 要让一个对象能够同时转化为 1 2 3，好像不可能；
// 怎么把对象转为数值？ toString方法；
// 怎么让返回值同时满足 1 2 3？ 状态机! 每进入一层判断就改变一个状态；

let o = {
    v: 0,
    toString() {
        return ++this.v
    }
}

if (o == 1) {
    if (o == 2) {
        if (o == 3) {
            console.log('执行') // 执行！
        }
    }
}

// 对象转为字符串

console.log(String(obj)) // "[object Object]"

console.log(String(objToStr)) // "3"

console.log({} + '123') // "[object Object]123"


// 显示作业答案
let btn = document.querySelector('button')
let answer = document.querySelector('#answer')

let qs = [![], +[], +![],
    [] + [], {} + {}, {} + [], {
        a: 0
    } + 1,
    [] + {},
    [] + ![], {} + [], ![] + [], '' + {}, {} + '', [][
        []
    ] + [],
    +!![] + [], +!![], 1 - {},
    1 - [], true - 1, {} - 1, [] == ![]
]

btn.addEventListener('click', () => {
    getAnswer()
    answer.style.display = 'block'
    btn.style.pointerEvents = 'none'
})

function getAnswer() {
    let liArea = document.createDocumentFragment()

    for (let i = 0; i < qs.length; i++) {
        liArea.appendChild(document.createElement('li'))
    }
    answer.appendChild(liArea)
    for (let j = 0; j < qs.length; j++) {
        answer.children[j].innerHTML = qs[j]
    }
}