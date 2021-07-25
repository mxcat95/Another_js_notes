// 音乐
let aud = document.querySelector('#aud')

// 音乐地址
let musicSrc = ['./audio/Alpha.mp3', './audio/Timetl.mp3', './audio/城南花开.mp3']

// 音乐控制按钮
let control = {
    pre: document.querySelector('#pre'),
    play: document.querySelector('#play'),
    next: document.querySelector('#next'),
}

// 默认第一首音乐
let index = 0

// 播放状态 默认没有播放
let isPlay = false

let isAuto = false

// 播放 / 暂停 按钮
control.play.addEventListener('click', () => {

    // 没播放点击播放 播放了点击暂停
    if (!isPlay) {

        changePlayer(-200, -210)

        aud.play()
        isAuto = true
        // 改变播放状态
        isPlay = true
    } else {

        changePlayer(-312, -22)

        aud.pause()
        isPlay = false
    }
})

// 上一曲

function preMusic() {
    // 索引减小
    index--
    // 减到第一首 则从跳到最后一首开始减
    if (index < 0) {
        index = musicSrc.length - 1
    }

    changePlayer(-200, -210)

    // 切换音乐 自动播放
    console.log(musicSrc[index])
    aud.src = musicSrc[index]
    aud.play()
    isPlay = true
}

control.pre.addEventListener('click', () => {
    preMusic()
})

// 下一曲

function nextMusic() {
    // 索引增加
    index++

    // 加道最后一首 则跳到第一首开始加
    if (index > 2) {
        index = 0
    }

    changePlayer(-200, -210)

    // 切换音乐 自动播放
    console.log(musicSrc[index])
    aud.src = musicSrc[index]
    aud.play()
    isPlay = true
}
control.next.addEventListener('click', () => {
    nextMusic()
})

// 自动循环播放
aud.addEventListener('ended', nextMusic)

function changePlayer(x, y) {
    // 更改按钮图标 让它瞬间改变
    control.play.style.cssText = `
            transition: 0s;
            background-position: ${x}px ${y}px;
        `

    // 10ms 之后再把过渡效果还原 人类肉眼无法察觉到的停顿 假装是连续操作
    setTimeout(() => {
        control.play.style.transition = 0.6 + 's'
    }, 10)
}