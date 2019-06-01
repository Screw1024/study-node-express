var http = require('http');
var fs = require('fs');

var template = require('art-template');
// 引入art-template模板引擎，引入的名称是npm安装的包名

var server = http.createServer();

var wwwDir = 'F:/www';
// 设置默认的本机地址访问的文件夹

server.on('request',function(req,res){
	
	fs.readFile('./06.模板html.html',function(err,data){
		// fs.readFile()方法，读取相对路径下的文件
		if(err){
			return res.end('404');
		}
		//找到上面设置的文件下对应的文件，如果找不到对应的文件报错

		fs.readdir(wwwDir,function(err,files){
			/*如果正确读取到文件之后，再读取指定路径下的文件夹目录*/
			if(err){
				return res.end('cannot read dir');
			}

			data = template.render(data.toString(),{
                title:'陈小帅是真的帅',
                dir:files       
			})
			// 通过替换{{}}中的内容，完成替换对应的文件名，：前面是{{}}中的名字，后面是替换值
            res.end(data);
		})
	})
})

server.listen(3000,function(){
	console.log('success')
})