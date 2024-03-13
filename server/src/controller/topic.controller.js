const {
  searchTopicsByPaging,
  insertOneTopic,
  modifyTopic,
  deleteTopic,
  likeTopic,
  cancelLikeTopic,
  searchAllUserOfLikeTopic,
  searchCommentByPaging,
  addCommentInHotTopic,
  checkExistHotTopicById,
  checkExistHotTopicCommentById,
  likeTopicComment,
  cancelLikeTopicComment,
  deleteCommentInHotTopic
} = require("../service/topic.service");
const { searchUserInfoById } = require("../service/user.service");

class HotTopicController {
  // 根据分页查询沸点列表
  async findTopicListByPaging(ctx, next) {
    const view_user_id = ctx.state.user.id;
    const res = await searchTopicsByPaging({
      pageNum: ctx.request.body.pageNum,
      pageSize: ctx.request.body.pageSize,
      audit_state: ctx.request.body.audit_state,
      classify: ctx.request.body.classify,
      belong_user: ctx.request.body.belong_user,
      view_user_id,
    });
    ctx.body = {
      code: 200,
      data: res,
    };
  }
  // 发布沸点
  async publishHotTopic(ctx, next) {
    const topic = {
      content: ctx.request.body.content,
      pictures: ctx.request.body.pictures || null,
    };
    // 发布的人一定是请求接口的人
    topic.user_id = ctx.state.user.id;
    const newTopic = await insertOneTopic(topic);
    ctx.body = {
      code: 200,
      data: {
        newTopic,
      },
    };
  }
  // 修改沸点审核状态
  async changeTopicAuditStatus(ctx, next) {
    await modifyTopic(
      { audit_state: ctx.request.body.audit_state },
      { id: ctx.request.body.id }
    );
    ctx.body = {
      code: 200,
      message: "修改沸点状态成功",
    };
  }
  // 删除沸点
  async removeTopicById(ctx, next) {
    await deleteTopic(ctx.request.query.id);
    ctx.body = {
      code: 200,
      message: "删除沸点成功",
    };
  }
  // 点赞沸点
  async handleLikeTopic(ctx, next) {
    await likeTopic(ctx.state.user.id, ctx.request.query.topic_id);
    ctx.body = {
      code: 200,
      message: "点赞沸点成功",
    };
  }
  // 取消点赞沸点
  async handleCancelLikeTopic(ctx, next) {
    await cancelLikeTopic(ctx.state.user.id, ctx.request.query.topic_id);
    ctx.body = {
      code: 200,
      message: "取消点赞沸点成功",
    };
  }
  // 查询指定沸点的所有点赞用户
  async findLikeTopicUserList(ctx, next) {
    const likerList = await searchAllUserOfLikeTopic(
      ctx.request.query.topic_id,
      ctx.state.user.id
    );
    ctx.body = {
      code: 200,
      message: "查询所有点赞者信息成功",
      data: likerList,
    };
  }
  // 根据沸点id查询沸点详细信息
  async findTopicInfoById(ctx, next) {
    const res = await searchTopicsByPaging({
      pageSize: 10,
      pageNum: 1,
      topic_id: ctx.request.query.topic_id,
      view_user_id: ctx.state.user.id,
    });
    if (res.total === 0) {
      ctx.body = {
        code: 500,
        message: "查询的沸点不存在",
      };
    } else {
      ctx.body = {
        code: 200,
        data: res.hotTopicList[0],
      };
    }
  }
  // 分页查询沸点的评论信息
  async findTopicCommentByPaging(ctx, next) {
    const view_user_id = ctx.state.user.id;
    const res = await searchCommentByPaging({
      pageNum: ctx.request.body.pageNum,
      pageSize: ctx.request.body.pageSize,
      topic_id: ctx.request.body.topic_id,
      classify: ctx.request.body.classify,
      offset: ctx.request.body.offset,
      view_user_id,
    });
    ctx.body = {
      code: 200,
      data: res,
    };
  }
  // 沸点评论
  async createHotTopicComment(ctx, next) {
    const comment = ctx.request.body;
    // 检查评论的沸点或回复的一级评论或回复的二级评论是否存在
    if (!comment.reply_id) {
      // 是评论的沸点，检查沸点是否存在
      let res = await checkExistHotTopicById(comment.hotTopic.id);
      if (!res) {
        ctx.body = {
          code: 500,
          message: "评论失败, 沸点不存在!",
        };
        return;
      }
    } else {
      let res = await checkExistHotTopicCommentById(comment.reply_id);
      if (!res) {
        ctx.body = {
          code: 500,
          message: "评论失败, 沸点评论不存在!",
        };
        return;
      }
      if (comment.reply_user_id && comment.reply_user_id !== comment.user_id) {
        res = await searchUserInfoById(comment.reply_user_id);
        if (!res) { 
          ctx.body = {
            code: 500,
            message: "评论失败, 回复的用户不存在!",
          };
          return;
        }
      }
    }
    const newComment = await addCommentInHotTopic(comment);
    if (newComment.id) {
      ctx.body = {
        code: 200,
        message: "评论成功",
        data: newComment,
      };
    } else {
      ctx.body = {
        code: 500,
        message: newComment.msg,
      };
    }
  }
  // 点赞沸点评论
  async handleLikeTopicComment(ctx,next) {
    await likeTopicComment(ctx.state.user.id, ctx.request.query.comment_id);
    ctx.body = {
      code: 200,
      message: "点赞沸点评论成功",
    };
  }
  // 取消点赞沸点评论
  async handleCancelLikeTopicComment(ctx,next) {
    await cancelLikeTopicComment(ctx.state.user.id, ctx.request.query.comment_id)
    ctx.body = {
      code: 200,
      message: "取消点赞沸点评论成功",
    };
  }
  // 删除沸点评论
  async removeHotTopicCommentById(ctx,next) {
    await deleteCommentInHotTopic(ctx.request.query.comment_id)
    ctx.body = {
      code: 200, 
      message: '删除评论成功'
    }
  }
  // {
  //     id: 1,
  //     audit_state: 'xxx'
  // }
}

module.exports = new HotTopicController();
