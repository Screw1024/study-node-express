var http = require('http');
var fs = require('fs');
// 引入两个核心库

var server = http.createServer();

server.on('request',function(req,res){
	var url = req.url;
    // 获取输入的请求字符串url

    if(url === '/'){
    	//‘/’后是请求的路径

    	fs.readFile('./reource/halloword.html',function(err,data){
    		if(err){
    			res.setHeader('Content-Type','text/plain; charset=utf-8');
    			res.end('老哥，没读出来，是不是路径或者文件名写错了啊');
    		}else{
    			//data存取的是读取到的内容，是二进制的数据，通过toString转为字符串
    			//res.end()支持两种格式，二进制格式和字符串类型
    			res.setHeader('Content-Type','text/html; charset=utf-8');
    			// 注意和上面个text/plain的区别，通过text/html声明html类型文件
    			res.end(data);
    		}
    	});
    }else if(url === '/pushu'){
	    	fs.readFile('./reource/pushu.jpeg',function(err,data){
    		if(err){
    			res.setHeader('Content-Type','text/plain; charset=utf-8');
    			res.end('老哥，没读出来，是不是路径或者文件名写错了啊');
    		}else{
    			//data存取的是读取到的内容，是二进制的数据，通过toString转为字符串
    			//res.end()支持两种格式，二进制格式和字符串类型
    			res.setHeader('Content-Type','image/jpeg');
    			// 图片反而不能声明utf-8编码格式他有特定的编码格式
    			res.end(data);
    		}
    	});
	 }
});

server.listen(3000,function(){
	console.log('老哥，安排好了');
});
