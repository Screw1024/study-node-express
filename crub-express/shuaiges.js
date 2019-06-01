var fs = require('fs')
// 引入文件读取核心模块，这个自定义文件模块，封装操作shuaiges.json的方法，做到类似数据库

filePath = './shuaiDb.json'
// 这里路径就是用来存放帅哥的文件夹

exports.find = function(callback){
	fs.readFile(filePath,function(err,data){
		if(err){
			return callback(err)
			// 读取失败，中止代码执行，并返回错误对象
		}
        callback(null,JSON.parse(data).shuaiges)
        // 当错误时，返回错误对象，正确时错误返回null，并且返回数据数组两个信息

        // callback回调函数是自定义的，需要区分回调函数返回的数据还是错误信息，如果直接传入
        // data无法与前面的err作区分，这里还是需要前面定义一个参数null，既可以作区分，又没有实际数值
	})
}

exports.findById = function(id,callback){
	fs.readFile(filePath,function(err,data){
		if(err){
			return callback(err)
		}

		var shuaiges = JSON.parse(data).shuaiges

        var shuaige = shuaiges.find(function(item){
        	return item.id === parseInt(id)
        	// .find( )是es6方法，遍历数组并返回符合find内传入方法的条件的值
        })
		callback(null,shuaige)
	})
}

exports.save = function(shuaige,callback){
	fs.readFile(filePath,function(err,data){
		if(err){
			return callback(err)
		}
		var shuaiges = JSON.parse(data).shuaiges
		// 将二进制数据转为对象，并操作内部的shuaiges数组

        shuaige.id = shuaiges[shuaiges.length -1].id + 1
        // 为每个添加进来的帅哥添加一个不重复的id

		shuaiges.push(shuaige)
		// 将post提交过来的shuaige对象，添加进对象之中数组

		var strData = JSON.stringify({
			shuaiges:shuaiges
		})
		// 将shuaiges对象再转换成字符串类型，为了写入文件

		fs.writeFile(filePath,strData,function(err){
            if(err){
            	return callback(err)
            	// 写入文件失败，返回错误对象
            }
            callback(null)
            // 写入成功，返回空的错误对象
		})
	})

}

exports.updata = function(shuaige,callback){
	fs.readFile(filePath,function(err,data){
		if(err){
			return callback(err)
		}

		var shuaiges = JSON.parse(data).shuaiges

		shuaige.id = parseInt(shuaige.id)
		// 存入时，将存入string形式的id改为data类型，防止数据类型不一致造成的问题

		var shuaigeOld = shuaiges.find(function(item){
			return item.id === parseInt(shuaige.id)
		})
		// .find()是es6方法，遍历数组并返回符合find内传入方法的条件的值

		for(var key in shuaige){
            shuaigeOld[key] = shuaige[key]
            // 将查询到的shuaige对象替换成新的对象
		}

	    var strData = JSON.stringify({
			shuaiges:shuaiges
		})
		// 将shuaiges对象再转换成字符串类型，为了写入文件

		fs.writeFile(filePath,strData,function(err){
            if(err){
            	return callback(err)
            }
            callback(null)
		})
	})
}

exports.delete = function(id,callback){
	fs.readFile(filePath,function(err,data){
		if(err){
			return callback(err)
		}
		
		var shuaiges = JSON.parse(data).shuaiges

		var deleteId = shuaiges.findIndex (function(item){
			return item.id === parseInt(id)
		})

		shuaiges.splice(deleteId,1)
		// es6语法，前一位指定开始的位置，后一位指定删除的长度

        var strData = JSON.stringify({
			shuaiges:shuaiges
		})

		fs.writeFile(filePath,strData,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})


	})

}