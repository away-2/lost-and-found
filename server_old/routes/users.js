const userService = require('../controller/mysqlController.js')

const router = require('koa-router')()

router.prefix('/user')

router.get('/userInfo', async (ctx, next) => {
  try{
    const result = await userService.findUserInfo();
    console.log(result);
    if(result.length) {
      ctx.body = {
        code: 8000,
        data: result,
        message: '查找成功'
      }
    } else {
      ctx.body = {
        code: 8004,
        data: 'error',
        message: '查找失败'
      }
    }
  }catch(e) {
    ctx.body = {
      code: 8002,
      data: e,
      message: '服务器异常'
    }
  }
})

module.exports = router
