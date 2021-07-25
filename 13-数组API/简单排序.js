let arr = [1, 5, 6, 78, 496, 9, 54, 6, 2, 9448, 23]

// 选择排序 (算法：形成套路的 能够解决问题的思想和方法)
// 遍历数组 将小的往前排列
function selectSort(arr) {
    let i, j, index, temp

    for (i = 0; i < arr.length; i++) {
        index = i
        for (j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[index]) {
                index = j // 交换索引
            }
        }
        // 把小的往前移动
        temp = arr[i]
        arr[i] = arr[index]
        arr[index] = temp
    }

    return arr
}

console.log(selectSort(arr)) // [1,2,5,6,6,9,23,54,78,496,9448]

// 另一种写法
function sort(arr) {
    let result = []
    let len = arr.length

    for (let i = 0; i < len; i++) {
        let s = Infinity
        let idx
        // 寻找最小值
        arr.forEach((item, index) => {
            if (item < s) {
                idx = index
                s = item
            }
        })

        // 将最小值 保存
        result.push(s)
        arr.splice(idx, 1) // 删掉原数组里的最小值 下一次再找第二小的值 以此类推
    }

    // 修改原数组
    arr.push(...result)
    return arr
}
// sort(arr)
// console.log(arr)


// 冒泡排序
// 遍历数组 两两比较 将大的往后排列
function maoPaoSort(arr) {

    let len = arr.length

    // 有多少元素 就自动排序多少次
    for (let i = 0; i < len; i++) {

        // 冒泡排序 两两比较 每次排序都把最大值移到后面 总共比较 len - 1 次
        for (let j = 0; j < len - 1 - i; j++) {
            // 前后比较 大的靠后
            if (arr[j] > arr[j + 1]) {

                let temp = arr[j] // 中介 用于交换数据
                arr[j] = arr[j + 1]
                arr[j + 1] = temp

            }
        }

    }

    return arr
}

let brr = [5, 6, 8, 1, 35, 12, 14, 53]
console.log(maoPaoSort(brr)) // [1,5,6,8,12,14,35,53]

// 这两种排序算法 是初级 入门的方法 也是效率很低的排序算法