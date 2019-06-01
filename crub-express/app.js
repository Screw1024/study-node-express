var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')

var router = require('./router.js')
// 引入自定义的将路由模块化的包

var app = express()

app.use('/node_modules/',express.static('./node_modules/'))
// 开放固定文件夹资源，前一项参数是监听的url，是否有这段字符，后一个参数是监听对应的文件夹
app.use('/public/',express.static('./public/'))

app.engine('html',require('express-art-template'))

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
// 模板引擎的配置和body-parser一定要在将路由模块挂载到服务之前


app.use(router)
// 将router容器挂载到node创建的服务器上

app.listen(3000,function(){
	console.log('succeed')
})