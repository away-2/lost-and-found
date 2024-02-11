const Router = require('@koa/router')
const router = new Router({ prefix: '/uploadService' })

const { uploadFile } = require('../controller/upload.controller')


router.post('/uploadFile',uploadFile)



module.exports = router