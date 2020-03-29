var express = require('express');
var router = express.Router();
const mongoose = require('../utils/mongo')
const zstorelogmodel = require("../model/zstorelogModel");

/* GET users listing. */
router.get('/', function(req, res, next) {
    zstorelogmodel.find(function(err,docs){
        if(err){
            console.log(err)
        }
        console.log("查询成功：" + docs);
        res.send(docs)
        
        // mongoose.disconnect(function(err){
        //     if(err)
        //     {
        //         console.log("断开连接失败！")
        //     }
        //     console.log("断开连接成功！")
        // })
    })
});

module.exports = router;