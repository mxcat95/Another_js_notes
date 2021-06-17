let divs = [...document.querySelectorAll('div')] // 选中所有div 并将类数组转化为数组

// 想要变化的信息
let message = [
    ['你', '瞅', '啥'],
    ['瞅', '你', '咋', '的'],
    ['再', '瞅', '一', '个', '试', '试'],
    ['试', '试', '就', '试', '试']
]

// 记录点击状态
let click = 0

let i = 0



// 左边点击 右边变化
divs[0].addEventListener('click', () => {

    animation(divs[1], i, message[i].length)
    i++
    if (i == 4) {
        i = 0
    }

})

// 右边点击 左边变化
divs[1].addEventListener('click', () => {

    animation(divs[0], i, message[i].length)
    i++
    if (i == 4) {
        i = 0
    }

})

function animation(el, n = 0, x) {

    // 设定定时器时间
    let time = 500

    // 用于控制message数组
    let i = n,
        j = 0

    // 用于控制div样式变化
    let cssInit = {
        w: 200,
        h: 200,
        fz: 40,
        lh: 200,
        top: 300
    }

    // 间隔0.5s自动变化
    let timer = setInterval(() => {

        el.innerHTML = message[i][j]
        if (j < message[i].length - 1) {
            j++
        }
        cssInit.w += 20
        cssInit.h += 20
        cssInit.lh += 20
        cssInit.fz += 20
        cssInit.top -= 60

        el.style.cssText = `
            width: ${cssInit.w}px;
            height: ${cssInit.h}px;
            font-size: ${cssInit.fz}px;
            line-height: ${cssInit.lh}px;
            top:${cssInit.top}px;
            color: blanchedalmond;
        `
    }, time)

    // 每次变化调整高度 形成蹦跳的动画效果
    let timer1 = setInterval(() => {
        el.style.top = `300px`
    }, time + 100)

    // 清除定时器 并且还原到最初形态
    setTimeout(() => {

        clearInterval(timer)
        timer = null
        clearInterval(timer1)
        timer1 = null

        el.style.cssText = `
            width: 200px;
            height: 200px;
            font-size: 40px;
            line-height: 200px;
        `
    }, (time + 100) * x)

    setTimeout(() => {
        el.innerHTML = '点我！'
    }, (time + 300) * x);

}