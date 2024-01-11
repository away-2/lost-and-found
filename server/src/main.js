// 入口文件
// 对于koa创建出来的app应用的一些use操作放在app里，并暴露出来
const app = require('./app')

const { APP_PORT } = require('./constant/env')

app.listen(APP_PORT,() => {
    console.log(`server is running at http://localhost:${APP_PORT}`)
})
