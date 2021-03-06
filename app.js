//querystring node 提供的原生模块 解析入参
const { rejects } = require('assert')
const { resolve } = require('path')
const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

//用于处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, rejects) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }

        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })

    })
    return promise
}

const serverHandle = (req,res) => {
    //设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    //获取path
    const url = req.url
    req.path = url.split('?')[0]

    //解析query
    req.query = querystring.parse(url.split('?')[1])

    //处理post data
    getPostData(req).then(postData => {
        req.body = postData

        //处理blog路由
    //blogResult 是promise
    const blogResult  = handleBlogRouter(req, res)

    if(blogResult) {
        blogResult.then(blogData => {
            res.end(
                JSON.stringify(blogData)
            )
        })
        return 
    }

    //处理user路由
    const userResult = handleUserRouter(req,res)

    if(userResult) {
        userResult.then(userData => {
            res.end(
                JSON.stringify(userData)
            )
        })
        return
    }

    //未命中路由
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 NOT Found\n")
    res.end()
    })

    //env: process.env.NODE_ENV 识别当前环境
    
}

module.exports = serverHandle