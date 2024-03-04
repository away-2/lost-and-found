const Router = require('@koa/router')
const router = new Router({ prefix: '/noticeService' })

const { findUserIncreaseFansNotice, findUserCommentNotice } = require('../controller/notice.controller')
const { auth } = require('../middleware/auth.middleware')

router.get('/findUserIncreaseFansNotice',auth,findUserIncreaseFansNotice)

router.get('/findUserCommentNotice',auth,findUserCommentNotice)

module.exports = router