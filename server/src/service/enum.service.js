const EnumInformation = require('../model/enum_information.model')
const { Op } = require('sequelize')

class EnumService {
    async searchGroupEnumByCodes({ codes }) {
        // 第一步 codes分隔成数组
        const codesArr = codes.split(',')
        // 第二步 开始in查询
        const groupEnum = await EnumInformation.findAll({
            where: {
                collection_code: { [Op.in]: codesArr }
            },
            order: [
                ['collection_label', 'DESC'],
                ['sequence', 'ASC']
            ],
            raw: true
        })
        
        if (groupEnum.length === 0) return {}
        // 第三步 封装好格式返回
        const result = {}
        codesArr.forEach(element => {
            result[element] = []
        })
        groupEnum.forEach(item => {
            result[item.collection_code].push({
                label: item.label,
                value: item.value,
                collectionId: item.collection_id
            })

        })
        return result
    }
}

const a = new EnumService()
// a.searchGroupEnumByCodes({ codes: "PLLX" })

module.exports = new EnumService()