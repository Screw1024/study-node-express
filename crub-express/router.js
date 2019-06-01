var fs = require('fs')
// 核心模块只要在所在的模块中被使用了，就需要重新引入

var express = require('express')
var Shuaiges = require('./shuaiges.js')
// 引入帅哥文件夹的操作模块

var router = express.Router()
// 创建一个express的路由容器


router.get('/',function(req,res){

	Shuaiges.find(function(err,shuaiges){
		if(err){
			return res.status(500).send('not find file')
			// 返回的状态码500，表示出错
		}
		res.render('index.html',{
			// 在express框架中，默认在views中寻找文件
			shuaiges:shuaiges
		})
	})
})
// 将路由都挂载到router容器上

router.get('/shuaiges/new',function(req,res){
	res.render('new.html')
	
})

router.post('/shuaiges/new',function(req,res){
    Shuaiges.save(req.body,function(err){
    	if(err){
    		return res.status(500).send('save fail')
    	}
    	res.redirect('/')
    	// 成功跳到首页
    })
})
router.get('/shuaiges/edit',function(req,res){
	Shuaiges.findById(parseInt(req.query.id),function(err,shuaige){
		// query中的查询字符串需要转换成数字类型，跟定义的时候相同
		if(err){
           return res.status(500).send('can not edit file')
		}
		res.render('edit.html',{
			shuaige:shuaige
		})

	})

})
router.post('/shuaiges/edit',function(req,res){

    Shuaiges.updata(req.body,function(err){
    	if(err){
    		return res.status(500).send('updata fail')
    	}
    	res.redirect('/')
    })
})

router.get('/shuaiges/delete',function(req,res){

	Shuaiges.delete(req.query.id,function(err){
		if(err){
			return res.status(500).send('delete fail')
		}
		res.redirect('/')
	})

})

module.exports = router




