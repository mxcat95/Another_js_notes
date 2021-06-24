// 函数的声明
function saySomething(str = '啊！你怎么这好看！') {
    console.log(str)
}
// 函数的调用
saySomething() // 啊！我怎么这么么好看
saySomething('呸！自恋狂！') // 呸！自恋狂！


// 函数参数的应用
// 计算一个数的平方 抽象参数 模拟变量 
function calc(x, y, z) {
    console.log(x, y, z)
}

calc(3, 4, 5) // 3,4,5 传入实参 将抽象参数具体化 完成相应功能

// 参数对不齐咋办
// 实参 > 形参
calc(1, 2, 3, 4, 5, 6, 7) // 1 2 3 忽略多余的参数
// 实参 < 形参
calc(1) // 1 undefined undefined 未定义的值返回undefined

// 函数返回值：
function cake() {
    return '蛋糕'
}

let Cake = {
    '蛋糕': '好甜！'
}

console.log(Cake[cake()]) // '好甜！'

// 函数表达式 处理点击事件
let handleClick = function () {
    console.log('我是外部函数 要激活一个内部函数！')

    return function () {
        console.log('我被点击了！我被激活了！oh shit!')
    }
}
document.querySelector('.clic').onclick = handleClick()

// 回调函数
function work(cb, str) {
    console.log(`工作一天了！好累！终于下班了！`)
    cb(str)
}

// 工作完之后要干嘛
function then(str) {
    console.log(str)
}

// 工作完之后要去打游戏
work(then, `我要去打游戏！`)

// 立执行函数 强烈推荐这种写法 不容易翻车
;
(function () {
    console.log('我是立执行函数！')
    return 1
})() // 我是立即执行函数

// 另一种写法
~~(function () {
    console.log('我也是立执行函数！')
})

// 甚至可以

~~ function () {
    console.log('哈哈哈！');
}()

// 立执行函数传参
;
(function (x) {
    console.log(x)
})(5) // 5

// 箭头函数
;
(() => {
    console.log('我是箭头函数！')
})()

;
((x, y) => console.log(x + y))(1, 2) // 3

// 如果只有一个参数 一条语句
;
(x => x ** 2)(2) // 4

// 箭头函数的this指向 指向window
function la() {
    console.log(this)
}

let lala = () => {
    console.log(this)
}

let obj = {
    age: 18
}

la.call(obj) // obj
lala.call(obj) // window


// ************************* 简单彩虹运动 ********************************* //
// 创建一个装彩虹的 div
document.querySelector('div').style.cssText = `
    width: 1000px;
    height: 450px;
    margin: 100px auto;
    border: 1px solid black;
    background-color: floralwhite;
`

// 创建一个ul标签
document.querySelector('div').innerHTML = '<ul></ul>'

// 创建7个列表
let liAera = document.createDocumentFragment() // 创建一个元素区域保存想添加的元素
let color = ['red', 'orange', 'yellow', 'green', 'blue', 'teal', 'purple']

// 添加七个li
for (let i = 0; i < color.length; i++) {
    liAera.appendChild(document.createElement('li'))
}

// 将七个li 添加到ul里面
document.querySelector('ul').appendChild(liAera)

let lis = [...document.querySelectorAll('li')]

for (let i = 0; i < color.length; i++) {
    lis[i].style.cssText = `
        width: ${100 + i * 100}px;
        height: 62px;
        background-color: ${color[i]};
        border: 1px solid #ccfc;
    `
}

// 让彩虹做个简单的运动
// 变长

function addWidth(el, n = 5) {
    let w = parseInt(el.style.width)
    w += n
    el.style.width = w + 'px'
}

// 变短
function reduceWidth(el, n = 5) {
    let w = parseInt(el.style.width)
    w -= n
    el.style.width = w + 'px'
}

// 给每个需要改变的元素设定初识状态
let isBorder = []
for (let i = 0; i < lis.length; i++) {
    isBorder[i] = 0
}

// 点击按钮 随机改变速度
let speed = []
document.querySelector('body').appendChild(document.createElement('button'))
document.querySelector('button').innerHTML = `点击变速`


document.querySelector('button').addEventListener('click', () => {
    for (let i = 0; i < lis.length; i++) {
        speed[i] = Math.ceil(Math.random() * 6)
    }
    move()
    document.querySelector('button').style.pointerEvents = 'none'
    setTimeout(() => {
        document.querySelector('button').style.pointerEvents = 'all'
    }, 10000);
})

// 默认先以5的速度运动10秒
move()

// 运动方式
function move() {

    // 60帧的刷新率
    let timer = setInterval(() => {

        for (let i = 0; i < color.length; i++) {
            // 默认先开始增长运动
            if (isBorder[i] === 0) {
                addWidth(lis[i], speed[i])
                // 运动到边界则改变运动状态
                if (parseInt(lis[i].style.width) >= 1000) {
                    isBorder[i] = 1
                }
            } else {
                // 变短
                reduceWidth(lis[i], speed[i])
                // 变短到边界值再改变运动方向
                if (parseInt(lis[i].style.width) <= 5) {
                    isBorder[i] = 0
                }
            }

        }
    }, 1000 / 60);


    // 十秒后关闭运动
    setTimeout(() => {
        clearInterval(timer)
    }, 10000);
}