const koa = require('koa')
const { koaBody } = require('koa-body')

const path = require('path')

const static = require('koa-static')

const indexRouter = require('../router/index')

const app = new koa()

const { koaSwagger } = require('koa2-swagger-ui')
const swagger = require('../config/swagger')

app.use(swagger.routes(),swagger.allowedMethods())
app.use(koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
        url: '/swagger.json'
    }
}))

const cors = require('@koa/cors')
app.use(cors({}))

// 托管静态资源
app.use(static(path.join(__dirname, '../../statics')))

app.use(koaBody({
    multipart: true, // 支持表单上传
    formidable: {
        maxFileSize: 10 * 1024 * 1024 // 限制10MB
    }
}))

// 注册路由
app.use(indexRouter.routes())

module.exports = app