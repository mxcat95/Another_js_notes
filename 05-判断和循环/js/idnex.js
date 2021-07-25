let input = document.querySelector('#in')

let btn = document.querySelector('#btn')

// if else 判断语法
if (true) {
    console.log(1)
}

// 使用if判断用户输入的答案是否正确

let paswd = 37 // 密码

btn.onclick = () => {

    if (input.value === '') {
        alert(`请输入答案！`)
        return
    }

    if (input.value * 1 === paswd) {
        console.log(input.value)
        alert('回答正确！')
        return
    }

    if (input.value < paswd) {
        console.log(input.value)
        alert('小了！')
        return
    }

    if (input.value > paswd) {
        console.log(input.value)
        alert('大了！')
        return
    }

}

// 实现一个函数 判断一个数是否大于0

function isBiggerThanZero(n) {

    // 标准写法
    // if (n > 0) {
    //     return true
    // } else {
    //     return false
    // }

    // 简化一下
    // if (n > 0) {
    //     return true
    // }
    // return false

    // 再简化一下
    // return n > 0 ? true : false

    // 完美简化
    return n > 0

}

// 运用：有输入有输出的纯函数
let score = 12
if (isBiggerThanZero(score)) {
    console.log(`nice！`)
} else {
    console.log(`离谱！`)
}

// if 和 switch

// 掷骰子的六种情况
function howManyStep(step) {

    // 这种离散的值，用 if 写法看起来很难受 可读性差
    if (step === 1) {
        console.log(`前进1格`)
    } else if (step === 2) {
        console.log(`前进2格`)
    } else if (step === 3) {
        console.log(`前进3格`)
    } else if (step === 4) {
        console.log(`前进4格`)
    } else if (step === 5) {
        console.log(`前进5格`)
    } else if (step === 6) {
        console.log(`前进6格`)
    } else {
        console.log(`离谱！`)
    }
}

howManyStep(5) // 前进5格

function howManyStepPlus(step) {

    // 改成switch之后 会清晰的多
    switch (step) {
        case 1:
            console.log(`前进1格`)
            break
        case 2:
            console.log(`前进2格`)
            break
        case 3:
            console.log(`前进3格`)
            break
        case 4:
            console.log(`前进4格`)
            break
        case 5:
            console.log(`前进5格`)
            break
        case 6:
            console.log(`前进6格`)
            break
        default:
            console.log(`离谱！`)
            break
    }
}
howManyStep(0) // 离谱！

// 循环

// 关于自增：

let a = 3

console.log(++a + a++ + a++) // 4 + 4 + 5 = 13
console.log(a) // 6

console.log(a++ + ++a + a++) // 6 + 8 + 8 = 19
console.log(a) // 9

// let b = 3 + (++2) // 直接报错一个无法处理的语法错误 无效的表达式
// Uncaught SyntaxError: Invalid left-hand side expression in prefix operation

// 在控制台打印10次666
let i
for (i = 0; i < 10; i++) {

    console.log('第' + i + '次：')
    console.log('666');

}
console.log(i) // 10

// 给页面中十个li标签的每一个 添加一个文本：这是第几行 单行红色 双行蓝色

let lis = document.querySelectorAll('li') // 选中

// 使用箭头函数判断奇偶数 更简单
// 但是有个问题 它必须声明在调用之前 因为箭头函数不是函数声明 没有优先权

let isEvenPlus = n => n % 2 === 0;

for (let i = 0; i < lis.length; i++) {
    lis[i].innerText = `这是第 ${i + 1} 行！`

    // 虽然可以直接写 不过 要是遇到逻辑更麻烦的判断 最好还是让函数来完成吧
    // if (i % 2 === 0) {
    //     lis[i].style.color = 'red'
    // } else {
    //     lis[i].style.color = 'blue'
    // }

    if (isEvenPlus(i + 1)) {
        lis[i].style.color = 'red'
    } else {
        lis[i].style.color = 'blue'
    }
}

// 判断奇偶数
function isEven(n) {
    if (n % 2 === 0) return true
    return false
}

// 循环嵌套

// 使用循环嵌套 依次打印 0~41

for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
        // 内存循环中，满6进一，相当于六进制
        // 转化换位十进制即可
        console.log(i * 6 + j);
    }
}

// 单次跳过循环

console.log('')

for (let i = 0; i < 10; i++) {
    if (i === 3) {
        console.log('')
        continue
    }
    console.log(i) // 少了个 3； i = 3 这一次循环不要了；
}

// 结束整个循环
console.log('')

for (let i = 0; i < 10; i++) {
    if (i === 3) {
        console.log('')
        break
    }
    console.log(i) // 0 1 2; 2以后的都不循环了；
}

// 循环了多少次
let count = 1
for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
        if (j === 4) {
            break // 结束了内部循环
        }
        console.log(count); // 原来要执行42次 现在只要执行28次
        count++
    }
}

// 这回要结束外部循环呢
let count2 = 1
forA: for (let i = 0; i < 7; i++) {
    forB: for (let j = 0; j < 6; j++) {
        if (j === 4) {
            break forA // 结束了外部循环
        }
        console.log(count2); // 原来要执行42次 现在只要执行4次
        count2++
    }
}

// while循环
let arr = [1, 2, 3, 4, 5, 6, -1, 7, 8, 9, 10]

// 找到第一个小于0的数

// for循环
console.log('');
for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) {
        console.log(arr[i]) // -1
        break
    }
}

// while 循环 for循环的简化版
console.log('')

let index = 0

while (arr[index++] >= 0) {}

console.log(arr[--index]) // -1 返回值的重要性