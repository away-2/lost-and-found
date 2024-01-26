// 公共工具函数

// 处理由于连接查询导致部分字段名是表名.字段名，去除表名
const handleDotInFieldDueToJoinQuery = (records) => {
    if (Object.is(records, null)) return null;
    let newRecords = JSON.parse(JSON.stringify(records))
    if (newRecords.constructor === Object) {
        newRecords = [newRecords]
    }
    newRecords.forEach(record => {
        const needDeleteFieldNames = []
        Object.keys(record).forEach(key => {
            if (key.includes('.')) {
                record[key.split('.')[1]] = record[key]
                needDeleteFieldNames.push(key)
            }
        })
        needDeleteFieldNames.forEach(key => {
            Reflect.deleteProperty(record, key)
        })
    });
    return records.constructor === Object ? newRecords[0] : newRecords
}

// 检查对象里是否满足所有必填字段
const checkRequriedFieldInObj = (fiedArr, obj) => {
    let flag = true
    fiedArr.forEach(checkField => {
        if (obj[checkField] === undefined || obj[checkField] === null) {
            flag = false;
        }
    })
    return flag
}

module.exports = {
    handleDotInFieldDueToJoinQuery,
    checkRequriedFieldInObj
}