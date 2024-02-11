const { searchTopicsByPaging, insertOneTopic, modifyTopic, deleteTopic, likeTopic, cancelLikeTopic } = require("../service/topic.service");

class HotTopicController {
    // 根据分页查询沸点列表
    async findTopicListByPaging(ctx, next) {
        const view_user_id = ctx.state.user.id;
        const res = await searchTopicsByPaging({
            pageNum: ctx.request.body.pageNum,
            pageSize: ctx.request.body.pageSize,
            audit_state: ctx.request.body.audit_state,
            view_user_id,
        });
        ctx.body = {
            code: 200,
            data: res,
        };
    }
    // 发布沸点
    async publishHotTopic(ctx, next) {
        const topic = { content: ctx.request.body.content, pictures: ctx.request.body.pictures || null }
        // 发布的人一定是请求接口的人
        topic.user_id = ctx.state.user.id
        const newTopic = await insertOneTopic(topic)
        ctx.body = {
            code: 200,
            data: {
                newTopic
            }
        }
    }
    // 修改沸点审核状态
    async changeTopicAuditStatus(ctx, next) {
        await modifyTopic({ audit_state: ctx.request.body.audit_state }, { id: ctx.request.body.id })
        ctx.body = {
            code: 200,
            message: '修改沸点状态成功'
        }
    }
    // 删除沸点
    async removeTopicById(ctx, next) {
        await deleteTopic(ctx.request.query.id)
        ctx.body = {
            code: 200,
            message: '删除沸点成功'
        }
    }
    // 点赞沸点
    async handleLikeTopic(ctx, next) {
        await likeTopic(ctx.state.user.id, ctx.request.query.topic_id)
        ctx.body = {
            code: 200,
            message: '点赞沸点成功'
        }
    }
    // 取消点赞沸点
    async handleCancelLikeTopic(ctx, next) {
        await cancelLikeTopic(ctx.state.user.id, ctx.request.query.topic_id)
        ctx.body = {
            code: 200,
            message: '取消点赞沸点成功'
        }
    }
    // {
    //     id: 1,
    //     audit_state: 'xxx'
    // }
}

module.exports = new HotTopicController()