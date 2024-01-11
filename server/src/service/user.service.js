// service层要操作数据库, 这里面的方法会经常被 controoler调用以完成某些功能, 因此这里肯定要引model层来操作表
const { convertFindResult } = require('../tools/index')
const { Op } = require('sequelize')
const User = require('../model/user.model')

class UserService {
    // 该方法接收用户的注册信息，在用户表中创建一个用户，注意：传到这里的user数据应是校验好的
    async createUser(userInfo) {
        
    }
}

module.exports = new UserService()

