// var 变量提升的循环绑定事件
var lis1 = document.querySelectorAll('.top li')

// 给每个li标签绑定点击事件
for (var i = 0, len1 = lis1.length; i < len1; i++) {

    lis1[i].onclick = () => {
        try {
            console.log(lis1[i].innerText)
        } catch (error) {
            console.log(error) // 打印报错信息
        }
        console.log(i) // 不管点击哪个 i 永远都是 5

    }
}
// 上面写法 直接翻车

// 闭包累加器

function addSelf() {
    let count = 0

    return () => {
        return count++
    }
}

let add = addSelf()

console.log(add(), add(), add()) // 0 1 2

// 在不使用let的情况下 如何解决上述循环绑定问题？ 使用闭包：
// 目的：每一个处理函数里 都有各自独立的 i 
// 要想有闭包 至少需要两个函数嵌套 里面的函数去访问外面函数的作用域

var lis2 = document.querySelectorAll('.bottom li')

// 方法一 多写几个闭包
function show(i) {
    console.log(lis2[i].innerHTML)
}

function makeShow(i) {
    return function () {
        show(i)
    }
}

function clickListen() {
    for (var j = 0, len2 = lis2.length; j < len2; j++) {
        lis2[j].onclick = makeShow(j)
    }
}
// clickListen()

// 方法二 使用匿名闭包 立执行函数
function other() {
    for (var j = 0, len2 = lis2.length; j < len2; j++) {
        lis2[j].onclick = (i => {

            // 每个li绑定一个计数器 相互独立 互不影响
            var index = 1
            return () => console.log(lis2[i].innerHTML, '点击' + index++ + '次')

        })(j)
    }
}

// other()


// 或者这样写 跟前一个写法没有区别 逻辑都一样
function another() {
    for (var j = 0, len2 = lis2.length; j < len2; j++) {

        (j => {
            var index = 1
            lis2[j].onclick = () => console.log(lis2[j].innerHTML, '点击' + index++ + '次')
        })(j)

    }
}
another()

// 清空闭包缓存

function clearCache(els) {
    for (var j = 0, len = els.length; j < len; j++) {

        els[j].onclick = null

    }
}

// 5秒后清空闭包的缓存
setTimeout(() => {
    clearCache(lis2)
}, 5000)