// 时延定时器

let timer1 = setTimeout(() => console.log('牛牛牛！'), 2000) // 两秒钟之后 打印 '牛牛牛'

console.log('啦啦啦') // 定时器并不会影响后续的代码执行

let timer2 = setTimeout(() => console.log('再来一个'), 2000) // 再来一个 与上一个定时器同步

// 经典面试题： 使用for循环 每隔一秒 打印数组的每一项

let arr = ['迪', '迦', '奥', '特', '曼']
// 使用 var 还会存在一个变量提升的问题
for (var i = 0; i < arr.length; i++) {

    // 使用闭包解决var的变量提升问题
    // 然后修改定时器时间 顺序打印
    ((i) => setTimeout(() => console.log(arr[i]), 1000 * (i + 1)))(i)

}

// 定时器的清除
clearTimeout(timer1) // 第一个定时器不生效了

// 间隔定时器
let timer = null

let a = 1

timer = setInterval(() => {
    console.log(a++)
}, 1000) // 隔一秒打印一次

// 使用延时器来清除 间隔定时器
setTimeout(() => {
    clearInterval(timer)
    timer = null
}, 1000 * 10)

// 定时器的参数
setTimeout(console.log, 1000 * 10, '大', '家', '好') // 大 家 好

// 定时器的 this 指向

// 一般情况指向 window
setTimeout(() => {
    console.log(this) // window
}, 1000 * 10)

// 即使调用对象的函数 依然指向 window

let obj = {
    fn: function () {
        console.log(this)
    },
    fn2: function () {
        setTimeout(this.fn, 1000 * 10)
    },
    fn3: function () {
        setTimeout(this.fn.bind(this), 1000 * 10)
    },
    fn4: function () {
        setTimeout(() => this.fn(), 1000 * 10);
    }
}

setTimeout(obj.fn, 1000 * 10) // window
// 这就等价于 在回调函数内部 let f = obj.fn; f() 自然是window调用的函数；

// 可以使用 bind 修改this属性
setTimeout(obj.fn.bind(obj), 1000 * 10) // obj

obj.fn2() // window

obj.fn3() // obj 使用了bind修改了this指向

obj.fn4() // obj 箭头函数没有this 所以内部的 this 实际上指向 obj