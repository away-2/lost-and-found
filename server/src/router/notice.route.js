const Router = require('@koa/router')
const router = new Router({ prefix: '/noticeService' })

const { findUserIncreaseFansNotice, findUserCommentNotice, findUserLikeAndCollectNotice, clearUnreadNotice } = require('../controller/notice.controller')
const { auth } = require('../middleware/auth.middleware')

router.get('/findUserIncreaseFansNotice',auth,findUserIncreaseFansNotice)

router.get('/findUserCommentNotice',auth,findUserCommentNotice)

router.get('/findUserLikeAndCollectNotice',auth,findUserLikeAndCollectNotice)

router.get('/clearUnreadNotice',auth,clearUnreadNotice)

module.exports = router