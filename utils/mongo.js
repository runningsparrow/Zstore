const mongoose = require('mongoose')
const MONGODB = require('../config/config').MONGODB;

//mongodb:// + [用户名:密码@] +数据库地址[:端口] + 数据库名。

const mdbconnect = mongoose.connect("mongodb://"+MONGODB.username+":"+MONGODB.password+"@"+MONGODB.host+":"+MONGODB.port+"/"+MONGODB.collection,{ keepAlive: 5 })



mdbconnect.then(function(result){
    console.log(result)
    console.log("mongo连接成功!")
}).catch(function(err){
    console.log(err)
    console.log("连接出错！")
})



module.exports = mongoose;