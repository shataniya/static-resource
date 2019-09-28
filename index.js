const path = require("path")
const fs = require("fs")

const fileType = {
    'css': 'text/css',
    'less': 'text/css',
    'gif': 'image/gif',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'swf': 'application/x-shockwave-flash',
    'tiff': 'image/tiff',
    'txt': 'text/plain',
    'wav': 'audio/x-wav',
    'wma': 'audio/x-ms-wma',
    'wmv': 'video/x-ms-wmv',
    'xml': 'text/xml'
}


/**
 * @params static_path 存放静态资源的路径或者文件夹  string
 * @params options     更多的参数配置对象           object
 */

module.exports = function(staticpath,options){
    // 这里要注意一下，因为如果 staticpath为undefined的时候，undefined转换为字符串就是 undefined
    var staticpath = staticpath && path.join(rootpath(__dirname),staticpath) || path.join(rootpath(__dirname),"/static")
    return async function static(ctx,next){
        var type = parseFileType(ctx.url)
        if(type){
            // 说明是要获取 静态资源
            ctx.type = type // 设置返回的文件类型
            ctx.body = fs.createReadStream(staticpath+ctx.url) // 从存储静态资源的文件夹里读取静态资源然后返回
        }
        await next()
    }
}

function parseFileType(url){
    var extname = path.extname(url)
    extname = extname ? extname.slice(1) : "unkown"
    return fileType[extname]
}

function isDesktop(url){
    var arr = url.split("\\")
    return arr[arr.length-2] === "Desktop"
}
// 获取根目录
function rootpath(url){
    var s = "/"
    var cache = []
    while(!isDesktop(url)){
        s += "../"
        cache.push(url)
        url = path.join(__dirname,s)
    }
    return cache.pop()
}