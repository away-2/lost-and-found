const router = require('koa-router')() //引入路由函数
const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')
const swaggerDefinition = {
    info: {
        title: '校园失物招领接口文档',
        version: '1.0.0',
        description: 'API',
    },
    host: 'localhost:3100', //设置访问路径，之后文档中的访问接口都是以这个开头
    basePath: '/api' // Base path (optional)
};
const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../router/*.js')] //配置路由router文件的位置
};
const swaggerSpec = swaggerJSDoc(options)
// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerSpec;
})
module.exports = router