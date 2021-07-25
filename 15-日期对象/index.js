// 日期对象
const date = new Date()
console.dir(date)

console.log(date.getFullYear() + '年') // 2021年

console.log(date.getMonth() + 1 + '月') // 7月

console.log(date.getDate() + '号') // 24号

console.log('星期' + date.getDay()) // 星期6 

console.log(date.getHours() + '点') // 19点

console.log(date.getMinutes() + '分') // 9分

console.log(date.getSeconds() + '秒') // 10秒

// 实现一个函数 将日期对象格式 返回为 'xxx年xx月xx日 xx : xx : xx'

function getTime(date) {

    let year = date.getFullYear()

    let month = date.getMonth() + 1
    month = month > 9 ? month : `0${month}`

    let day = date.getDate()

    let hour = date.getHours()
    hour = hour > 9 ? hour : `0${hour}`

    let minute = date.getMinutes()
    minute = minute > 9 ? minute : `0${minute}`

    let second = date.getSeconds()
    second = second > 9 ? second : `0${second}`


    return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
}
console.log(getTime(new Date())) // 2021年07月24日 20:07:56


// 设置一天前的时间
let yesterDay = new Date(new Date().valueOf() - (1000 * 3600 * 24))
console.log(yesterDay.toLocaleDateString(), yesterDay.toLocaleTimeString())
// 2021/7/23 下午8:07:56


// 实现一个函数：接收两个日期对象 计算出相隔多久

// 保留 两位 位小数
function toFixed(num) {
    return num.toFixed(2)
}

function diffDate(date1, date2) {

    // 获取时间差
    let time = Math.abs(date1.valueOf() - date2.valueOf())

    if (time < 1000) {
        return `${time} 毫秒`
    }

    if (time >= 1000 && time < 60000) {
        return `${time / 1000 } 秒`
    }

    if (time >= 60000 && time < 3600000) {
        return `${toFixed(time / 1000 / 60) } 分`
    }

    if (time >= 3600000 && time < 86400000) {
        return `${toFixed(time / 1000 / 3600)} 时`
    }

    if (time >= 86400000 && time < 2592000000) {
        return `${toFixed(time / 1000 / 3600 / 24) } 天`
    }

    if (time >= 2592000000 && time < 31104000000) {
        return `${toFixed(time / 1000 / 3600 / 24 / 30) } 月`
    }

    if (time >= 31104000000) {
        return `${toFixed(time / 31104000000)} 年`
    }
}


let d1 = new Date(2021, 6, 24, 20, 1, 56)
let d2 = new Date(1995, 12, 22, 20, 1, 59)

console.log(diffDate(d1, d2)) // 25.87年