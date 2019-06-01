var http = require('http');
var fs = require('fs');

var server = http.createServer();
// 通过http核心模块创建服务器

var wwwDir = 'F:/www';

server.on('request',function(req,res){
	var url = req.url;

	var filePath = '/index.html';
	// 默认的路径是index.html

	if(url !== '/'){
		filePath = url;
		//如果在的导航栏中写了路径，按照写的路径
	}

	fs.readFile(wwwDir + filePath, function(err,data){
		if(err){
			res.setHeader('Content-Type','text/plain; charset=utf-8');
			return res.end('老哥，找不到到文件啊');
		}
		fs.readdir(wwwDir,function(err,files){
			if(err){
				res.setHeader('Content-Type','text/plain; charset=utf-8');
				return res.end('老哥，www文件夹里面没有文件夹啊');
			}
			console.log(files);
		})
		res.end(data);
	})
})

server.listen(3000,function(){
	console.log('老哥安排好了，加油');
})
// 监听3000端口号，成功后输出提示