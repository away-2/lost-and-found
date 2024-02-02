const { searchTopicsByPaging } = require("../service/topic.service");

class HotTopicController {
    // 根据分页查询沸点列表
    async findTopicListByPaging(ctx, next) {
        const view_user_id = ctx.state.user.id;
        const res = await searchTopicsByPaging({
            pageNum: ctx.request.body.pageNum,
            pageSize: ctx.request.body.pageSize,
            view_user_id,
        });
        ctx.body = {
            code: 200,
            data: res,
        };
    }
}

module.exports = new HotTopicController()