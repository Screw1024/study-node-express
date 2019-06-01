var express = require('express')
var postBody = require('body-parser')
// 引入body-parser插件包

var server = express()
// 创建服务器

server.use(postBody.urlencoded({extended:false}))
server.use(postBody.json())
// 配置body-parser

var events = [
  {
  	name:'RNG',
  	date:'2018-3',
  	event:'2018LPL春季赛冠军'
  },
  {
    name:'RNG',
  	date:'2018-8',
  	event:'2018LPL夏季赛冠军'
  },
  {
    name:'RNG',
  	date:'2018-9',
  	event:'2018LSM季中赛冠军'
  },
  {
    name:'IG',
  	date:'2018-11',
  	event:'S8世界总决赛冠军！'
  }
]
// 事件通过数组存放 

server.use('/public/',express.static('./public/'))
// 开放公开文件夹，可以通过url访问这个文件夹下级文件，前一个参数是监听带有/public/的url
// 后一个是指定url中的/public/对应的文件夹

server.engine('html',require('express-art-template'))
// 引入art-template应该同时安装express-art-template和art-template两个bao
// 虽然后面一个不会被引入，却是前者包的依赖。前一个参数是模板文件的后缀名。

server.get('/',function(req,res){
    res.render('index.html',{
    	events: events
    	// 模板引擎的使用，替换占位符中的数据
    })
})
// 监听url路径

server.get('/yous',function(req,res){
    res.render('yous.html')
})
// 监听的是get方式请求的带有/yous的url


server.post('/yous',function(req,res){
	var event = req.body
	// 通过上面的body-parser插件将复杂的post请求的的请求体，包装成get方式请求的query的格式
	event.date = '2018-12-5'
	events.push(event)
    // res.statusCode = 302
    // res.setHeader('Location','/')
    // 这次原生的代码方式，下面直接使用express中已经封装的方法
    res.redirect('/') 
})
// 监听的是post方式请求的带有/yous路径，这是写完记录之后跳转的
// 跟上面监视的是同样的url，但是请求的方式不一样，所以对应不同的结果


server.listen(3000,function(){
	console.log('succeed')
})