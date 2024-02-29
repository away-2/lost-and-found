// 这里只会用到 controller里面的方法来作为路由的回调函数, service层和这里没有任何关系
const Router = require("@koa/router");
const router = new Router({ prefix: "/userService" });

// 引入controller层的方法作为回调
const {
  register,
  login,
  loginByEmail,
  checkAlreadyConcernSomeone,
  checkAlreadyLikeSomeone,
  concernSomeone,
  cancelConcernSomeone,
  findNumberInfoAboutUser,
} = require("../controller/user.controller");
const { sendVarifyCode } = require("../controller/nodemailer.controller");
// 引入一些要用到的中间件
const {
  userValidator,
  loginRequiredInfoValidator,
} = require("../middleware/user.middleware");
const { auth } = require("../middleware/auth.middleware");

/**
 * @swagger
 * /userService/register:
 *   post:
 *     description: 用户注册
 *     summary: "用户注册♪（＾∀＾●）"
 *     tags: [用户模块]
 *     requestBody: {
 *
 *     }
 *     responses:
 *       200:
 *         description: 获取数据列表
 * */
// 注册用户
router.post("/register", userValidator, register);

// 普通登录用户
router.post("/login", loginRequiredInfoValidator, login);

// 发送邮箱验证码
router.get("/sendVarifyCode", sendVarifyCode);

// 根据邮箱登录用户
router.post("/loginByEmail", loginByEmail);

// 查询当前用户是否关注了某个用户
router.get("/checkAlreadyConcernSomeone", auth, checkAlreadyConcernSomeone);

// 查询当前用户是否点赞了某个用户
router.get("/checkAlreadyLikeSomeone", auth, checkAlreadyLikeSomeone);

// 让当前用户关注某个用户
router.get("/concernSomeone", auth, concernSomeone);

// 让当前用户取消关注某个用户
router.get("/cancelConcernSomeone", auth, cancelConcernSomeone);

// 查询指定用户的一些数量上的信息
router.get('/findNumberInfoAboutUser',auth,findNumberInfoAboutUser)

module.exports = router;
