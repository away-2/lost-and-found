// controller负责处理宏观上的逻辑, 细致的操作数据库交给service处理
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constant/env");
const {
  searchUsersByCondition,
  judgeSomeoneAlreadyConcernOther,
  judgeSomeoneAlreadyLikeOther,
  letSomeoneConcernOther,
  letSomeoneCancelConcernOther,
  searchNumberInfoAboutUser,
  searchUserInfoById
} = require("../service/user.service");

class UserController {
  // 注册
  async register(ctx, next) {
    const userObj = ctx.request.body;
    console.log(userObj);
    ctx.body = {
      code: 200,
      message: "用户注册成功",
      data: {
        id: 1,
        user_name: "静态测试",
      },
    };
  }
  // 普通登录
  async login(ctx, next) {
    // 中间件已验证必填字段都有了
    const { user_name, password, identity } = ctx.request.body;
    // first_step: 根据用户名去找有没有这个用户
    let users = [];
    if (identity === "user") {
      users = await searchUsersByCondition({
        logicOpt: "and",
        whereArr: [{ user_name }],
      });
    } else if (identity === "admin") {
      users = await searchUsersByCondition({
        logicOpt: "and",
        whereArr: [{ user_name, is_admin: 1 }],
      });
    }
    if (users.length === 0) {
      ctx.body = {
        code: 500,
        message: "登录的用户不存在",
      };
      return;
    }
    // second_step: 判断密码是否正确
    const user = users[0];
    if (user.password !== password) {
      ctx.body = {
        code: 500,
        message: "密码不正确",
      };
      return;
    }
    // third_step: 准备token
    // 把password单独解构出来, 不要把密码暴露出去
    const { password: userPassword, ...userInfo } = user;
    const token = jwt.sign(userInfo, JWT_SECRET, { expiresIn: "2h" });
    ctx.body = {
      code: 200,
      message: "用户登录成功",
      data: {
        token,
        userInfo,
      },
    };
  }
  // 邮箱登录
  async loginByEmail(ctx, next) {
    const { email } = ctx.request.body;
    // first_step: 根据邮箱找到用户
    let users = await searchUsersByCondition({
      logicOpt: "and",
      whereArr: [{ email }],
    });
    const { password: userPassword, ...userInfo } = users[0];
    const token = jwt.sign(userInfo, JWT_SECRET, { expiresIn: "2h" });
    ctx.body = {
      code: 200,
      message: "用户登录成功",
      data: {
        token,
        userInfo,
      },
    };
  }
  // 查询当前用户是否关注了某个用户
  async checkAlreadyConcernSomeone(ctx, next) {
    const { passiveUser } = ctx.request.query;
    const res = await judgeSomeoneAlreadyConcernOther(
      ctx.state.user.id,
      passiveUser
    );
    ctx.body = {
      code: 200,
      message: "查询成功",
      data: res,
    };
  }
  // 查询当前用户是否点赞了某个用户
  async checkAlreadyLikeSomeone(ctx, next) {
    const { passiveUser } = ctx.request.query;
    const res = await judgeSomeoneAlreadyLikeOther(
      ctx.state.user.id,
      passiveUser
    );
    ctx.body = {
      code: 200,
      message: "查询成功",
      data: res,
    };
  }
  // 让当前用户关注某个用户
  async concernSomeone(ctx, next) {
    const { passiveUser, concern_way } = ctx.request.query;
    // 查出activeUser是否已经关注了passiveUser
    const isAlreadyConcern = await judgeSomeoneAlreadyConcernOther(
      ctx.state.user.id,
      passiveUser
    );
    // activeUser确实没关注passiveUser, 则做关注的事
    if (!isAlreadyConcern) {
      await letSomeoneConcernOther(ctx.state.user.id, passiveUser, concern_way);
    }
    ctx.body = {
      code: 200,
      message: "关注成功",
    };
  }
  // 让当前用户取消关注某个用户
  async cancelConcernSomeone(ctx, next) {
    const { passiveUser } = ctx.request.query;
    // 查出activeUser是否已经没有关注passiveUser
    const isAlreadyConcern = await judgeSomeoneAlreadyConcernOther(
      ctx.state.user.id,
      passiveUser
    );
    // activeUser确实是已经关注passiveUser, 则做撤销关注的事
    if (isAlreadyConcern) {
      await letSomeoneCancelConcernOther(ctx.state.user.id, passiveUser);
    }
    ctx.body = {
      code: 200,
      message: "取消关注成功",
    };
  }
  // 查询指定用户的一些数量上的信息
  async findNumberInfoAboutUser(ctx,next) {
    const info = await searchNumberInfoAboutUser(ctx.request.query.user_id)
    ctx.body = {
      code: 200,
      data: info
    }
  }
  // 根据用户id查询用户信息
  async findUserInfoById(ctx,next) {
    const res = await searchUserInfoById(ctx.request.query.id)
    ctx.body = {
      code: 200,
      data: res
    }
  }

  // 通过学号查找学生信息
  // async findStudentInfoByStudentCode(ctx, next) {
  //   const { student_code } = ctx.query
  //   const res = await findStudentInfoByStudentCodeService(student_code)
  //   if (Object.is(res, null)) {
  //     ctx.body = {
  //       code: 500,
  //       message: '学号不存在'
  //     }
  //   } else {
  //     ctx.body = {
  //       code: 200,
  //       message: '查找成功',
  //       data: res
  //     }
  //   }
  // }
}

module.exports = new UserController();
