const Router = require('@koa/router')
const router = new Router({ prefix: '/enumService' })

const { findGroupEnumByCodes } = require('../controller/enum.controller')
const { auth } = require('../middleware/auth.middleware')

router.get('/findGroupEnumByCodes',auth,findGroupEnumByCodes)

module.exports = router