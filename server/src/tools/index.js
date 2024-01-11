// 公共工具函数

exports.convertFindResult = (findResult) => {
    const arr = []
    findResult.forEach(item => {
        arr.push(item.dataValues)
    })
    return arr
}