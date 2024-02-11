const { upload } = require('../service/upload.service')

class UploadController {
    async uploadFile(ctx, next) {
        const res = await upload(ctx)
        ctx.body = {
            code: 200,
            message: '上传成功',
            data: res
        }
    }
}
module.exports = new UploadController()