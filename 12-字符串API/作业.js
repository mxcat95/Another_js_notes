// 自行实现 一个 字符串 includes 方法

/**
 * @param { 原字符串 } str 
 * @param { 子字符串 } key 
 * @return { boolean }
 * @description 第二个参数默认为空字符串
 */
function includes(str, key = '') {

    // 非字符串无意义
    if (typeof key !== 'string' || typeof str !== 'string') {
        throw new Error('无意义的参数！')
    }

    let keylen = key.length // 子字符串的长度
    let len = str.length - keylen + 1 // 分段比较次数

    if (len >= -1) {
        // 比较位置
        for (let i = 0; i < len; i++) {
            let result = true
            // 从该位置挨个比较 是否匹配
            for (let j = 0; j < keylen; j++) {
                // 没找到直接跳出
                if (key[j] !== str[i + j]) {
                    result = false
                    break
                }
            }
            // 全部匹配到 就结束循环
            if (result) {
                return true
            }
        }
    }

    return false
}

// 自行实现字符串 indexOf方法

/**
 * @param { 原字符串 } str 
 * @param { 字字符串 } key 
 * @return { indexStr } 匹配的下标
 */
function indexOf(str, key = '') {

    if ((str === '' && key === '') || (str !== '' && key === '')) {
        return 0
    }

    if (includes(str, key)) {

        let indexStr = [] // 保存索引
        for (let i = 0, len = str.length; i < len; i++) {
            if (str[i] === key[0]) {
                indexStr.push(i)
            }
        }

        return indexStr
    }

    return '查无此符！'

}

// 自行实现字符串 replaceAll 方法

/**
 * @param { 原字符串 } str 
 * @param { 想要替换的字符串 } oldStr
 * @param { 替换内容 } reStr
 * @return { 新字符串 } str 
 * @description | 由于前面封装的 indexOf 方法没有考虑到后期使用的麻烦 所以这里采用尾递归写法
 */
function replaceAll(str, oldStr, reStr) {

    let existStatus = indexOf(str, oldStr) // 获取要替换目标的索引

    // 如果要替换的字符不存在 则替换
    if (existStatus === '查无此符！') {
        return str
    }

    // 要替换的字符串为空的时候
    if (oldStr === '') {

        let newStr = ''

        // 依次在原字符串的每个字符前插入要修改的字符串
        for (let i = 0; i < str.length; i++) {
            newStr += (reStr + str[i])
        }

        // 在末尾也加一个
        newStr += reStr

        return newStr
    }

    // 要替换的字符串不为空的时候
    if (oldStr !== '') {

        // 如果替换内容 包含要替换的字符 则先将要替换的字符全部替换为空格 再把空格替换为替换内容
        if (includes(reStr, oldStr)) {
            let newStr = replaceAll(str, oldStr, '⫘')

            return replaceAll(newStr, '⫘', reStr)
        }

        let [left, right] = ['', '']

        // 把不需要替换的左边部分保留下来
        for (let j = 0; j < existStatus[0]; j++) {
            left += str[j]
        }

        // 把不需要替换的右边部分保留下来
        for (let k = existStatus[0] + oldStr.length; k < str.length; k++) {
            right += str[k]
        }

        // 替换第一个匹配的字符串
        str = left + reStr + right

        // 清空缓存 用新字符串再去循环 替换第二个匹配的字符串 以此类推...
        left = right = ''

        return replaceAll(str, oldStr, reStr)
    }
}

// 自行实现一个函数 将 url 字符串 转化为对象格式
function urlToObj(url) {

    let obj = {}

    if (!includes(url, '&')) {
        return url
    }

    let arr = url.split('&')

    for (let i = 0; i < arr.length; i++) {
        let newArr = arr[i].split('=')

        obj[newArr[0]] = newArr[1]
    }

    return JSON.stringify(obj)
}


// 导出模块
export {
    includes,
    indexOf,
    replaceAll,
    urlToObj
}