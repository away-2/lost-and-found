const { searchUserIncreaseFansNotice, searchUserCommentNotice } = require('../service/notice.service')

class NoticeController {
    // 查询登录用户所有新增粉丝通知
    async findUserIncreaseFansNotice(ctx,next) {
        const notices = await searchUserIncreaseFansNotice(ctx.state.user.id)
        ctx.body = {
            code: 200,
            data: notices
        }
    }
    // 查询登录用户所有评论通知
    async findUserCommentNotice(ctx,next) {
        const notices = await searchUserCommentNotice(ctx.state.user.id)
        ctx.body = {
            code: 200,
            data: notices
        }
    }
}

module.exports = new NoticeController()