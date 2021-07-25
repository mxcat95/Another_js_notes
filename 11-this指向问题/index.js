// this指向
function foo() {
    console.log(this === window)
}
foo() // true 此时 函数是被window对象调用 所以this就指向window


let obj = {
    foo() {
        console.log(this === obj)
    }
}
obj.foo() // true 此时是obj在调用这个函数

// this有什么用？

// 自我介绍
function instro(name) {
    console.log(`他是 ${name}`)
}

let person = {
    name: '墨杉',
    mood: '开心',
    instro: instroP
}

let person1 = {
    name: 'momo',
    mood: '伤心',
    instro: instroP
}
instro(person.name)
instro(person1.name)
// 其实这样去调用函数 一直都是window在调用
// 为了减轻window的负担，可以让对象自己去介绍自己
// 那就可以使用 this 去稍微改一改
function instroP() {
    console.log(`我是 ${this.name} 我很${this.mood}！`) // 用this来指代对象
}

person.instro()
person1.instro()
// 这样就让 window 工作轻松点了

// 之前的循环绑定翻车事件 现在有了新的解决方法
var lis = document.querySelectorAll('ul li')

for (var i = 0, len = lis.length; i < len; i++) {
    let index = 1
    lis[i].onclick = function () {
        console.log(this.innerText, `点击了 ${index++}次`)
        // 比起使用闭包来说 风险和工作量都大大减轻了
    }
}

// 下面这个this指向谁？
let a = {
    b: {
        c: {
            d: {
                fn() {
                    console.log(this)
                    console.log(this.name)
                },
                name: 'd'
            },
            name: 'c'
        },
        name: 'b'
    },
    name: 'a'
}

a.b.c.d.fn() // 指向(a.b.c.d)  d

let fn = a.b.c.d.fn
fn() // 此时 window调用了这个函数 就会指向window name = ''

// 这个呢？
let o = {
    fn() {
        console.log(this) // o调用 指向o对象

        function f() {
            console.log(this)
        }
        f() // window在调用 指向window
    }
}

o.fn()

// 这就相当于： 你是一个战士(o对象)，你先打了一枪(fn())
// 然后你队长(window) 把他的枪搭在你身上也打了一枪(f())
// 虽然打了两枪，枪声都在同一个地方，但开枪的人不是同一个人 

// this的存在，使得原来的面向过程的开发 能够转化为更实用 更安全的面向对象的开发
function calcs() {

    return {
        count: 0,
        add: function () {
            return this.count++
        },
        incre: function () {
            return this.count--
        }
    }
}

let ca1 = calcs() // 一个对象
let ca2 = calcs() // 另一个对象 
ca1.add() // 1
ca1.add() // 2
ca1.incre() // 1
console.log(ca1.count) // 1

ca2.incre()
console.log(ca2.count) // -1 使用同样的属性和方法 互不影响

// 如果要导出成为一个模块，就不需要把每个函数都在全局导出去 而是只需要导出一个对象就可以

// 箭头函数的this指向：
// 题目一：

let bala = () => {
    console.log(this)
}
bala() // 此时 箭头函数是在window环境才创建的 没有调用者 所以指向 window

// 题目二：
let oo = {
    name: 'oo',
    fn: function () {
        let foo = () => {
            console.log(this)
        }
        foo()
    }
}

let f = oo.fn // 把对象的函数 提取到全局了
oo.fn() // oo调用fn 就会创建一个 箭头函数 foo， 自然 foo执行的this就会指向 oo 
f() // 该函数在全局调用 生成的箭头函数 foo也在全局 所以 this指向 window

// 题目三：
let ooo = {
    name: 'ooo',
    fn: function () {
        return () => {
            console.log(this)
        }
    }
}

let ff = ooo.fn() // ooo调用fn 创建了箭头函数 foo 并返回给 全局的ff

ff() // 虽然foo在全局运行 但它是上一行代码创建的 所以 this指向 ooo

// 题目四
let fff = ooo.fn // 把对象内部的函数 提升到了外部
fff()() // 指向window 因为 foo 是在window环境下被创建的

// 题目5
function fala() {
    let fn = () => {
        console.log(this)
    }

    function foo(f) {
        f()
    }

    return {
        fn: fn,
        foo: foo
    }
}

let s = fala()
s.foo(s.fn) // window 乍一看很绕 但实际上 箭头函数fn在上一行代码中就在window中 被声明了

// 如果 把 fn 改成普通函数 结果还是 window 因为没有对象调用它

// this的绑定
let a1 = {
    name: 'a1',
    fn() {
        console.log(this.name)
    }
}

a1.fn() // a1

let a2 = {
    name: 'a2'
}

let fa = a1.fn.bind(a2)
fa() // a2 修改了 this的指向