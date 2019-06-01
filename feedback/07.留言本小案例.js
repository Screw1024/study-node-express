var http = require('http')
var fs = require('fs')
var url = require('url')
// 引入相关的核心模块

var template = require('art-template')
// 引入js模板引擎包，在项目中也添加为了发给别人能用

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

// 直接使用url判断路径时，判断的部分一定是最后一位，如127.0.0.1：3000浏览器默认在3000后添加一个'/'，下面判断的就是这个
// 127.0.0.1：3000/yous就是判断的/yous，也就是url的路径，当后面有查询（?后面的），不可以直接判断url，需要使用url核心模块了

http 
    .createServer(function(req,res){

    	var parseObj = url.parse(req.url,true)
    	// 通过url核心模块的API，将url包装成一个对象，true表示将查询字符串转换成一个对象（query）
    
    	var pathname = parseObj.pathname
    	// 获取查询字符串之前的路径
    	if(pathname === '/'){
    		fs.readFile('./views/index.html',function(err,data){
    			if(err){
    				return res.end('404')
    			}
                
                data = template.render(data.toString(),{
                    events:events
                })

    			res.end(data)
    		})
    	}
    	else if(pathname === '/jilu'){
    		//?之后的路径全部被封装到query中，所以可以直接使用
    		var event = parseObj.query
    		// event中的战队名字和荣誉
    		event.date = '2018-12'
    		events.push(event)
    		// 将最近的事件添加到events数组中

    		res.statusCode = 302
    		// 设置状态码
    		res.setHeader('Location','/')
    		// 设置头文件中的Location属性，指向重定向的地址
    		res.end()

    	}
    	else if(pathname.indexOf('/public/') === 0){
    		// 将请求的静态资源全部放入public文件夹中，可以统一地进行处理
    		// 有'/public/'开头的网页地址请求，改为文件路径请求
    		fs.readFile('.' + pathname,function(err,data){
    			if(err){
    				return res.end('404')
    			}
    			res.end(data)
    			// 前面一定不能忘记'.'因为'./'表示当前路径，而'/'表示磁盘根目录
    		})
    	}
    	else if(pathname === '/yous'){
    			// 没有文件后缀名是为了简化url，也更美观
                fs.readFile('./views/yous.html',function(err,data){
                	if(err){
                		return res.end('404')
                	}
                	res.end(data)
                })
        }
    	else{
    		fs.readFile('./views/404.html',function(err,data){
    			if(err){
    				return res.end('404')
    			}
    			res.end(data)
    		})
    		// 如果url地址不在上述可能下，将界面显示为404界面，为了更好的交互和中止请求
    	}		
    })
    .listen(3000,function(){
    	console.log('success');
    })
    // 直接这样写，简洁代码，不用再接收.createServer()的返回值了