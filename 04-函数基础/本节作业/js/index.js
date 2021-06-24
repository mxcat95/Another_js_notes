/**
 *  原生js： 只用最基础语法：表单操作 控制流程 DOM基础操作 函数基础用法...
 * 
 * 注意事项：
 *      1.对于同一个目标，需要执行不同的操作，但是这些操作存在冲突，就需要使状态变量来控制；
 *          例如：动画效果 
 *                  让一个盒子从100px自动变长到300px,再自动缩短到10px，
 *                  再自动变长到300px...重复运动；
 *                  就需要用不同的状态来控制它此时此刻到底是该变长还是变短；
 *      2.变量的作用域：
 *          每个变量生效的区域一定要搞清楚，是全局作用还是块级作用
 *          尤其注意：
 *              把外部变量当成函数参数传入进行操作，无法改变外部变量原有的值；
 *              因为传进去的只是一个值，而不是该变量的内存地址；
 * 
 *              如果想从外部获取到某函数或者某块级作用域内的局部变量，
 *              可以使用闭包，但是事件监听的回调函数本身就是一个闭包，
 *              想获取闭包中的变量值，需要闭包嵌套...很容易翻车...
 *              
 *              尽量避免使用闭包，会造成不必要的内存泄露和资源占用；
 *              如果需要的数量少，可以使用全局变量获取内部的值...数量多就...
 *              emmmm....也尽量少写全局变量吧....
 *      3.流程控制的优化：
 *           怎么优化循环和判断的次数、速度？
 *              怎么说呢...在不使用算法和设计模式的情况下，就是：
 *              反证法，排除法...
 *              如果要找的目标数量太多或者约束条件的运算太复杂，那就不找了，不算了，
 *              先找不需要的，把不要的排除了，剩下的就是目标了;
 *       4.一个函数执行一个特定功能，越简单越好，不要试图把所有功能都封装在一个函数里..
 *       ......吧啦吧啦吧啦......
 * 
 *  项目：
 *      一个简单聊天室模拟练习 先写到这 更多功能敬请...ε=(´ο｀*)))唉~不着急...慢慢来！
 *          emmmm...其实是暂时懒的写了...
 *      该版本实现的基础功能: 
 *          1.模拟注册登录;
 *          2.实现头像上传；
 *          3.实现聊天功能；
 *          4.实现消息撤回功能；
 *          5.实现简单音乐播放；
 *      难点在于：
 *          我需要给左右两个用户解决各种事件的冲突 就需要很多状态变量去判断当前是谁在操作 而不会去影响到对方
 *          简单说就是 周伯通的 左右互搏之术 假装自己是两个独立的对象 虽然技能相同 但是可以各玩各的 互不影响
 *          
 *          比如：左边用户撤回消息，不能把右边用户的消息也撤回了吧...
 * 
 *      可新增或细化的功能：
 *          1.可优化聊天室UI，交互感受，响应式布局等；
 *          2.可优化代码结构和算法，减少性能消耗；
 *          3.可新增表情包和图片对战功能；
 *          4.可新增文件传送功能(文档、音频、视频...)；
 *          5.可新增语音消息；
 *          6.消息撤回可细化：
 *              撤回时间限制；
 *              连续撤回次数限制；
 *              撤销撤回......
 *          7.可新增聊天室各种UI界面的动态切换效果；
 *          8.可新增一些背景特效、动画...
 *          9.可新增用户名是否重名的检测...
 *          10.可新增聊天敏感字词的检测...
 *          ......叭啦叭啦叭啦一大堆...反正需求永远写不完...
 * 
 *      可深化的操作：
 *          1.可结合数据库，实现一个前后端结构完整的聊天室；
 *          2.可使用socket技术搭建远程服务器 实现在线聊天功能；
 *          ......还有很多能做的....慢慢想...
 */

/* ******************************* 全局变量 *************************************** */

// 状态变量

// ID确认状态
let isClick1 = false
let isClick2 = false

// 头像上传状态
let isLoad1 = false
let isLoad2 = false

// 用户的ID 全局使用
let id_l
let id_r

// 默认头像地址 如果懒得上传，就使用默认提供的表情
let src_l = './images/3.webp'
let src_r = './images/4.webp'

// dom元素
let doms = {
    chatRoom: document.querySelector('main'), // 聊天面板 用于显示聊天内容
    left_user: document.querySelector('.lu'), // 左边用户ID显示区
    right_user: document.querySelector('.ru'), // 右边用户ID显示区
    img_l: document.querySelector('#headl'), // 左边用户预览头像
    img_r: document.querySelector('#headr'), // 右边用户预览头像
    head_l: document.querySelector('#userLe'), // 左边用户上传头像
    head_r: document.querySelector('#userRe'), // 右边用户上传头像
    tip: document.querySelector('#tip') // 消息撤回的提示
}

// 表单元素
let inputs = {
    user_l: document.querySelector('#user_l'), // 左边用户ID输入区
    user_r: document.querySelector('#user_r'), // 右边用户ID输入区
    input_l: document.querySelector('#input_l'), // 左边用户发言
    input_r: document.querySelector('#input_r'), // 右边用户发言
    file_l: document.querySelector('#l_img'), // 左边用户上传头像
    file_r: document.querySelector('#r_img'), // 右边用户上传头像
}

// 按钮
let buttons = {
    yes_l: document.querySelector('#yes_l'), // 左边用户ID输入确定按钮
    yes_r: document.querySelector('#yes_r'), // 右边用户ID输入确定按钮
    send_l: document.querySelector('#send_l'), // 左边用户发言发送按钮
    send_r: document.querySelector('#send_r'), // 右边用户发言发送按钮
    back_l: document.querySelector('#back_l'), // 左边用户发言撤回按钮
    back_r: document.querySelector('#back_r') // 右边用户发言撤回按钮
}

/***************************** 用户ID处理 *********************************/

// 用户ID处理函数

/**
 * @function ：获取用户ID
 * @param {哪个输入框} input | 输入ID
 * @param {是否确认ID了} isClick | 如果确认了ID 就改变状态
 * @param {ID显示在哪个区域} dom | ID的显示区域
 * @param {用谁来接收ID} id | 接收ID的变量 只允许设置一次
 * @param {哪个按钮} el | 确认ID的按钮
 */
function getId(input, isClick, dom, el, who) {

    let id = input.value

    if (who === 'left') {
        id_l = id
    } else if (who === 'right') {
        id_r = id
    } else {
        return
    }

    // ID显示样式
    dom.innerHTML = `<span style="color:purple;">${id}</span> <span style="color:green;">加入聊天室！</span>
                        <p>欢迎光临！</p>
                        <p>请 <span style = "color:purple;">${id}</span> 文明发言！</p>
        `
    input.value = '' // 清空输入框
    input.placeholder = `当前用户：${id}`
    input.readonly = true // 设置只读权限
    input.disabled = true // 禁用表单
    // 改变确认状态
    isClick = true


    // 如果确认了 就禁用按钮功能
    if (isClick) {
        el.style.pointerEvents = 'none'
    }
}

/***************************** 用户头像处理 *********************************/

// 获取上传的图片地址 并实现预览
/**
 * @function ：获取图片地址并且预览图片
 * @param {哪里的文件发生了变化} fliedom | 左边用户上传还是右边用户上传
 * @param {在哪里预览} checkdom | 头像预览区域 上传前确认一下
 * @param {谁确认了} who | 左边还是右边 确认了就改变状态和头像
 */
function getImageURL(fliedom, checkdom, who) {

    // 等待文件上传之后 触发变化事件

    fliedom.addEventListener('change', function () {

        let src

        try {
            // 提取上传文件的物理地址
            src = window.URL.createObjectURL(this.files[0])
            // 预览图片
            checkdom.style.background = `url(${src}) no-repeat center/cover`
            // 将提示信息情空
            checkdom.innerText = ''
        } catch (error) {
            console.log(error)
        }

        // 根据状态记录头像地址 并且改变确认状态
        if (who === 'l') {
            src_l = src // 左边用户确认
            isLoad1 = true // 上传状态改为已确认
        } else if (who === 'r') {
            src_r = src
            isLoad2 = true
        } else {
            return
        }
    })
}

// 左边用户点击头像上传区域 触发 input:file 的点击事件
doms.img_l.addEventListener('click', () => {
    // 触发文件上传的点击事件
    inputs.file_l.click()

    // 取得左边头像的地址 并预览头像
    getImageURL(inputs.file_l, doms.img_l, 'l')
})

// 右边用户预览头像
doms.img_r.addEventListener('click', () => {
    inputs.file_r.click()
    getImageURL(inputs.file_r, doms.img_r, 'r')
})

// 头像设置 设置完毕禁用即禁用文件上传
/**
 * @function ：设置头像并且禁用更改
 * @param {谁要设置头像} id | 判断用户是否存在 不存在先注册 不然不给上传头像 
 * @param {设置在哪里显示} imgdom | 确认了就把图片上传到这个位置
 * @param {要设置的图片路径} src | 图片路径
 * @param {要禁用的表单} el | 上传之后把对应的文件上传按钮禁用 不许更改了(主要是懒得写更新操作...)
 * @param {是不是上传了头像} isLoad | 上传了把文件表单禁用
 * @param {头像预览区} checkdom | 如果没上传图片 而是采用了系统默认的 只要提交了ID注册 预览区图片也变成默认的 并且禁用头像上传
 */
function setHeader(id, imgdom, src, el, isLoad, checkdom) {

    // 如果ID还没设置 先返回设置ID
    if (id === undefined) {
        return
    }
    // 改变图片路径
    imgdom.src = src

    // 如果确认了 就禁用按钮功能
    if (isLoad) {
        el.disabled = true
    } else {
        console.log(src);
        // 没上传头像 就使用系统默认的头像
        checkdom.style.background = `url(${src}) no-repeat center/cover`
        checkdom.innerText = ''
        el.disabled = true
    }
}

/***************************** 用户信息确认(注册) *********************************/

// 左边用户信息监听
buttons.yes_l.addEventListener('click', () => {
    // 用户名不能为空
    if (inputs.user_l.value === '') {
        alert(`请给小的赐个响亮的名号吧！`)
    } else {

        // 只有一次修改机会 确认就禁用表单
        if (!confirm(`你只有一次更改机会！\n\n确认吗？`)) {
            return
        }
        // 确认ID
        getId(inputs.user_l, isClick1, doms.left_user, buttons.yes_l, 'left')

        // 确认头像
        setHeader(id_l, doms.head_l, src_l, inputs.file_l, isLoad1, doms.img_l)

        // 开启聊天功能
        document.querySelector(`.sayL`).style.display = 'block'
    }
})

// 右边边用户信息监听
buttons.yes_r.addEventListener('click', () => {

    if (inputs.user_r.value === '') {
        alert(`请给小的赐个响亮的名号吧！`)
    } else {

        if (!confirm(`你只有一次更改机会！\n\n确认吗？`)) {
            return
        }
        getId(inputs.user_r, isClick2, doms.right_user, buttons.yes_r, 'right')
        setHeader(id_r, doms.head_r, src_r, inputs.file_r, isLoad2, doms.img_r)
        document.querySelector(`.sayR`).style.display = 'block'
    }
})

/***************************** 聊天室发送消息处理 *********************************/

// 接收聊天信息 并显示在聊天区域
/**
 * @function ：把用户消息显示到聊天框中
 * @param {在哪显示聊天内容} chatRoom | 聊天内容的显示区域 
 * @param {从哪个输入框获取聊天消息} mesdom | 也就是区分是左边的说话还是右边的说话
 * @param {判断用户存不存在 在就把ID显示到面板中} id | 虽然没注册的时候隐藏了 聊天输入框 为了以防万一 还是检测一下
 * @param {把头像也显示到面板中} src | 头像 + ID ： 说话的内容
 * @param {聊天信息的显示布局} divstyle | 新增一个div 包含了用户头像 ID 消息
 * @param {头像样式表名} className | 头像样式设置
 * @param {字体颜色} color | 消息的字体颜色
 */
function showMessage(chatRoom, mesdom, id, src, divstyle, className, color) {

    // 先注册 才能发言
    if (id === undefined) {
        alert(`请给自己取个帅气的昵称吧！`)
        return
    }

    // 不想输入就给个默认消息
    let mes = mesdom.value === '' ? '懒得输入了！' : mesdom.value

    // 创建消息显示样式
    let mesAera = `
        <div class="${divstyle}">
            <img src=${src} class="${className}"><span style="color:purple;">${id} </span>
            <p style="color:${color};">${mes}</p>
        </div>
    `

    chatRoom.innerHTML += mesAera
    // 清空输入框
    mesdom.value = ''
}

// 左边用户发送消息
buttons.send_l.addEventListener('click', () => {
    showMessage(doms.chatRoom, inputs.input_l, id_l, src_l, 'mes_l', 'header_l', 'black')
})

// 右边用户发送消息
buttons.send_r.addEventListener('click', () => {
    showMessage(doms.chatRoom, inputs.input_r, id_r, src_r, 'mes_r', 'header_r', 'blueviolet')
})

/***************************** 聊天室撤回消息处理 *********************************/

// 左边用户撤回消息
buttons.back_l.addEventListener('click', () => {
    let backl = removeMessage('mes_l', 'l')

    // 撤回提示
    if (backl === 0) {
        doms.tip.innerHTML = `当前无消息可撤回！`
    } else if (backl === 'endl') {
        doms.tip.style.color = 'crimson'
        doms.tip.innerHTML = `"<span>${id_l}</span>：快住手！你已经没消息可撤了！"`
    } else {
        doms.tip.innerHTML = `"<span>${id_l}</span>：<span>撤回一条消息!</span>"`
    }

})

// 右边用户撤回消息
buttons.back_r.addEventListener('click', () => {
    let backr = removeMessage('mes_r', 'r')
    if (backr === 0) {
        doms.tip.innerHTML = `当前无消息可撤回！`
    } else if (backr === 'endr') {
        doms.tip.style.color = 'crimson'
        doms.tip.innerHTML = `"<span>${id_r}</span>：快住手！你已经没消息可撤回了！"`
    } else {
        doms.tip.innerHTML = `"<span>${id_r}</span>：<span>撤回一条消息!</span>"`
    }
})

// 撤回消息的方法
/**
 * @function ：根据不同用户操作撤回对应用户的消息
 * @param {判断是哪个用户的消息} className | 根据类名来判断该操作哪个用户的消息 
 * @param {谁要撤回} dir | 左边撤回还是右边撤回
 * @returns {0 | 'endl' | 'endr' | 'yesl' | 'yesr'} | 0：无消息 endl：左边撤光了
 * | endr： 右边撤光了 yesl： 左边撤回一条 yesr： 左边撤回一条
 */
function removeMessage(className, dir) {

    // 获取消息节点
    let mesDiv = doms.chatRoom.children
    // 消息节点所对应的索引
    let len = mesDiv.length - 1


    // 如果当前没有消息 就不执行该函数
    if (len < 0) {
        return 0
    }

    // 判断是谁想撤回 l表示左边用户 r表示右边用户
    if (dir === 'l') {

        let i
        for (i = len; i >= 0; i--) {
            // 每次执行只会去寻找并撤回该用户最近发送的一条消息
            if (mesDiv[i].className === className) {
                mesDiv[i].remove()
                break
            }
        }
        // 如果撤光了 就结束该函数
        if (i < 0) {
            return 'endl' // 左边用户全部撤回了
        }
        return 'yesl' // 表示左边用户撤回一条成功
        // 右边用户方法同上
    } else if (dir === 'r') {
        let i
        for (i = len; i >= 0; i--) {
            if (mesDiv[i].className === className) {
                mesDiv[i].remove()
                break
            }
        }
        if (i < 0) {
            return 'endr' // 右边用户全部撤回了
        }
        return 'yesr' // 表示右边用户撤回一条成功
    }

}