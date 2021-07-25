console.log(a)

if (1 > 0) {
    var a = 3
}

// 对象是一种引用类型

let o = {
    n: 1
}

function foo(o) {

    // let o = o 浅拷贝
    o.n = 3
    o = 2
    console.log(o) // 2
}

foo(o) // 2

console.log(o) // {n:3} 对象的属性值 被函数作用域里声明的另一个o给改了

// 浅拷贝

let b = o // 其实这不是复制对象 只是给对象加了个别名而已

b.n = 6

console.log(o) // {n:6} b的操作会直接影响o原来的属性值

// 深拷贝 其实就去遍历对象的每一个属性 然后去把它拷贝到一个新对象中

// 这是一个很复杂的嵌套对象
let obj1 = {
    x: 1,
    y: '你好',
    z: undefined,
    v: [1, 2, 3],
    b: {
        p: 5,
        o: [1, {
            a: 6
        }]
    },
    f: function () {
        return 666
    }
}

// 方法一 JSON方法

let objStr = JSON.stringify(obj1) // 转化为字符串
let objJson = JSON.parse(objStr) // 还原为一个新对象

objJson.x = 2
console.log(objJson) // x : 2 并且少了z和f属性
console.log(obj1) // x : 1

// 会发现，这种方式，虽然不会影响源对象 但是无法拷贝 undefined function类型；

// 方法二 Object.assign(t,o)

let objAssign = Object.assign({}, obj1)

objAssign.x = 3
objAssign.v[0] = 0
objAssign.b.p = 1

console.log(objAssign) // x:3  v:[0,1,2]  b{p:1}
console.log(obj1) // x:1  v:[0,1,2] b{p:1}

// 会发现，如果源对象属性值是普通类型，没有影响 但是是引用类型，则依然只是浅拷贝；

// 方法三 递归遍历拷贝

function deepClone(source) {
    let cloned

    // 如果源数据是个对象
    if (typeof source === 'object') {
        // 判断是数组还是普通对象
        if (Array.isArray(source)) {
            cloned = []

            // 遍历数组
            for (const index in source) {
                if (Object.hasOwnProperty.call(source, index)) {
                    // 每次都去调用自己判断一下 该数组的每一项是不是引用类型 确保实现深拷贝
                    cloned.push(deepClone(source[index]))
                }
            }
        } else if (source === null) {
            cloned = null // 空对象就给个空值
        } else if (source.constructor === RegExp) {
            cloned = source // 正则的实例 直接复制
        } else {
            cloned = {}
            // 如果是普通对象 则遍历拷贝

            for (const key in source) {
                if (Object.hasOwnProperty.call(source, key)) {
                    cloned[key] = deepClone(source[key])
                }
            }
        }
    } else {
        // 不是对象 就是基本数数据类型 直接复制
        cloned = source
    }

    return cloned
}

let objDeep = deepClone(obj1)

objDeep.x = 3
objDeep.v[0] = 3
objDeep.b.p = 6

console.log(objDeep) // x:3  v:[3,1,2]  b{p:6}
console.log(obj1) // x:1  v:[0,1,2] b{p:1}

// 相对完美，多少嵌套都可以深拷贝