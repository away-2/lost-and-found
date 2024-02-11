const Appendix = require('../model/appendix.model')
const fs = require('fs')
const path = require('path')
const { APP_PORT } = require('../constant/env')
const { Op } = require('sequelize')

class UploadServices {
    async upload(ctx) {
        let remoteFilePath = null;
        if(ctx.request.files['file']) {
            let file = ctx.request.files.file
            // 创建可读流
            const reader = fs.createReadStream(file.filepath)
            const timeStamp = Math.floor(new Date().getTime() / 100)
            const serviceFileName = timeStamp + '.' + file.originalFilename.split('.')[1]
            // 要把文件写到的目的地
            let filePath = path.join(__dirname,'../../statics/upload/' + serviceFileName)
            remoteFilePath = `http://localhost:${APP_PORT}/upload/${serviceFileName}`
            // 创建可写流
            const upStream = fs.createWriteStream(filePath)
            reader.pipe(upStream)
            // 文件信息写入数据库
            const fileInfo = {
                file_name: file.originalFilename,
                file_path: remoteFilePath,
                file_size: file.size
            }
            let res = await Appendix.create(fileInfo)
            return res
        }
    }
}

module.exports = new UploadServices()