let str = 'dfdad fsfefsdxcdsg gfdgds dsad'

console.log(str.length) // 30

console.log(str[15]) // d

// 字符串的遍历
for (const i in str) {
    if (str[i] === 'd') {
        console.log(i)
    }
}

console.log(str.charAt(2)) // d

console.log('0'.charCodeAt(0), 'A'.charCodeAt(0), 'a'.charCodeAt(0)) // 48 65 97

// 编码转字符串
console.log(String.fromCharCode(...[25105, 21916, 27426, 20320])) // 我喜欢你

// 将数组的每个项转化为字符 拼接成字符串

let arr = ['a', 'b', 'c']
console.log(''.concat(...arr)) // abc

console.log(str.endsWith('d')) // 是以d结尾

console.log('墨杉很帅'.includes('很帅')) // turn

console.log('我不做大哥很多年'.replace('大哥', '老油条')) // 我不做老油条很多年

let str1 = '上海，自来水，来自，海上'

console.log(str1.split('，')) // ["上海", "自来水", "来自", "海上"]

let url = 'username=mx&passward=9527&isAdmin=1'
console.log(url.split('&')) // [username=mx, passward=9527, isAdmin=1]

console.log(str1.slice(3, 6)) // 自来水
console.log(str1.slice(-9, -6)) // 自来水
console.log(str1.substr(3, 6)); // 自来水，来自 