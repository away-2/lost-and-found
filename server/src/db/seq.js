const { Sequelize } = require('sequelize')

const { MYSQL_HOST,MYSQL_USER,MYSQL_PWD,MYSQL_DB } = require('../constant/env')

const seq = new Sequelize(MYSQL_DB,MYSQL_USER,MYSQL_PWD,{
    host: MYSQL_HOST,
    dialect: 'mysql'
})

// 单独执行该文件，测试连接数据库
// seq.authenticate().then(()=>{
//     console.log('数据库连接成功');
// }).catch((err)=>{
//     console.log('数据库连接失败',err)
// })

module.exports = seq