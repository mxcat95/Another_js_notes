let wallet = 1000 // 声明变量
console.log(wallet) // 使用变量

// 合法变量声明
let ab, Ab, a1, $s, 你好, _ab;

// 非法变量声明
// let 1a, 2A, -a, +a, ￥sa, s——a, ...ad...

// 查询文档对象类型
console.log(document)

// 选中 div#box 标签
let box = document.querySelector('#box')

// 给div添加文字
box.innerHTML = `<h1>Hello World!</h1>`

// 设置简单样式
box.innerHTML += `<p>墨杉会变得超级厉害！</p>`
box.childNodes[1].style.backgroundColor = '#ccfc'

// 添加图片
box.innerHTML += `<img src="./images/1.jpg" alt="渡劫" title="渡劫" width="600" height="300">`

// 给box添加点击事件处理 需求： 点击box 修改其中标题内容
box.onclick = function () {
    box.children[0].innerHTML = `你点了，我变了！`
}