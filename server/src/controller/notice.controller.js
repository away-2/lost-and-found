const {
  searchUserIncreaseFansNotice,
  searchUserCommentNotice,
  searchUserLikeAndCollectNotice,
  modifyCommentNotice,
  modifyIncreaseFansNotice,
  modifyLikeAndConcernNotice,
} = require("../service/notice.service");

class NoticeController {
  // 查询登录用户所有新增粉丝通知
  async findUserIncreaseFansNotice(ctx, next) {
    const notices = await searchUserIncreaseFansNotice(ctx.state.user.id);
    ctx.body = {
      code: 200,
      data: notices,
    };
  }
  // 查询登录用户所有评论通知
  async findUserCommentNotice(ctx, next) {
    const notices = await searchUserCommentNotice(ctx.state.user.id);
    ctx.body = {
      code: 200,
      data: notices,
    };
  }
  // 查询登录用户所有赞和收藏通知
  async findUserLikeAndCollectNotice(ctx, next) {
    const notices = await searchUserLikeAndCollectNotice(ctx.state.user.id);
    ctx.body = {
      code: 200,
      data: notices,
    };
  }
  // 清空用户未读通知
  async clearUnreadNotice(ctx,next) {
    const view_user_id = ctx.state.user.id
    const updateObj = { read_status: '1' }
    let whereObj = {}
    switch (ctx.request.query.type) {
        case 'comment':
            whereObj = { receive_notice_user_id: view_user_id, read_status: '0' }
            await modifyCommentNotice({ whereObj,updateObj })
            break;
        case 'increaseFans':
            whereObj = { user_id: view_user_id, read_status: '0' }
            await modifyIncreaseFansNotice({ whereObj,updateObj })
            break;
        case 'likeAndConcern':
            whereObj = { receive_notice_user_id: view_user_id, read_status: '0' }
            await modifyLikeAndConcernNotice({ whereObj,updateObj })
            break;
    }
    ctx.body = {
        code: 200,
        message: '清空未读通知成功'
    }
  }
}

module.exports = new NoticeController();
