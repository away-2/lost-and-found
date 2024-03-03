const { addCommentInHotTopic } = require("../service/topic.service");

// 废弃
class CommentController {
    // 添加一条评论
    async addComment(ctx, next) {
        const view_user_id = ctx.state.user.id;
        switch (ctx.request.body.commentType) {
            case 'FD' | 'FDPL':
                
            break;
            
        }
        ctx.body = {
            code: 200,
            data: res,
        };
    }
}

module.exports = new CommentController()