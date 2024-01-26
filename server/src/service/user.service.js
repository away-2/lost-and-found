// service层要操作数据库, 这里面的方法会经常被 controoler调用以完成某些功能, 因此这里肯定要引model层来操作表
const { convertFindResult } = require('../tools/index')
const { Op } = require('sequelize')
const User = require('../model/user.model')
const StudentCode = require('../model/student_code.model')
const School = require('../model/school.model')
const { handleDotInFieldDueToJoinQuery } = require('../tools/index')

class UserService {
    // 根据条件查找用户
    async searchUsersByCondition({ logicOpt, whereArr }) {
        const res = await User.findAll({
            where: {
                [Op[logicOpt]]: whereArr
            },
            raw: true
        })
        return res
    }
    // 该方法接收用户的注册信息，在用户表中创建一个用户，注意：传到这里的user数据应是校验好的
    async createUser(userInfo) {

    }
    // 根据学号查询该学号以及学校的信息
    async findStudentInfoByStudentCode(code) {
        const res = handleDotInFieldDueToJoinQuery(await StudentCode.findOne({
            include: [{
                model: School,
                as: 'school',
                attributes: ['school_name']
            }],
            where: {
                code
            },
            raw: true
        }))
        return res;
    }
}

module.exports = new UserService()

