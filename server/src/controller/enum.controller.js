const { searchGroupEnumByCodes } = require('../service/enum.service')

class EnumController {
    async findGroupEnumByCodes(ctx,next) {
        const { collectionCodes } = ctx.request.query
        const res = await searchGroupEnumByCodes({ codes: collectionCodes })
        ctx.body = {
            code: 200,
            message: '查询枚举成功',
            data: res
        }
    }
}

module.exports = new EnumController()