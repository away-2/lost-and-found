// 让node能连接上mysql
const mysql = require('mysql')
const config = require('../config')

// 创建线程池
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT
})

// 连接数据库，执行sql语句
const allService = {
  query: function(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => { // 连接数据库
        if (err) {
          reject(err)
        } else { // 连接成功
          connection.query(sql, values, (err, rows) => { // 执行sql语句
            if (err) {
              reject(err)
            } else { // sql语句执行成功
              resolve(rows)
            }
            connection.release() // 断开连接
          })
        }
      })
    })
  }
}


// 查询用户信息
const findUserInfo = () => {
  let _sql = `select * from user;`
  return allService.query(_sql)
}
module.exports  = {
  findUserInfo,
  
}