const mongoose = require('../utils/mongo')
const zstorelogmodel = require("../model/zstorelogModel");


//add
const zstorelog = new zstorelogmodel({
    logid: 1,
    logdate: "2020/3/24",
    loguser: "joe",
    logsystem: "PLEXFA",
    logdisk: "A97D A97E",
    logapplyuser: "zym",
    logtimestamp: new Date(),
})

// const zstorelog = new zstorelogmodel({
//     logid: 3,
//     logdate: "2020/3/24",
//     loguser: "潘洁群",
//     logsystem: "PLEXF5",
//     logdisk: "D4F7 D4F8",
//     logapplyuser: "张一鸣",
//     logtimestamp: new Date(),
// })


zstorelog.save(function(err, docs){
    if(err) {
        console.log(err);
    }
    console.log("保存成功：" + docs);
    mongoose.disconnect(function(err){
        if(err)
        {
            console.log("断开连接失败！")
        }
        console.log("断开连接成功！")
    })
})



//delete

//findOneAndDelete
// zstorelogmodel.findOneAndDelete(
//     {logid: 2},
//     function(err,docs){
//         if(err)
//         {
//             console.log("删除失败！")
//         }
//         console.log("删除成功：" + docs)

//         mongoose.disconnect(function(err){
//             if(err)
//             {
//                 console.log("断开连接失败！")
//             }
//             console.log("断开连接成功！")
//         })
//     }
// )


//update

//findOneAndUpdate
// zstorelogmodel.findOneAndUpdate(
//     {logid: 2},
//     {"$set":{loguser: "潘洁群潘洁群",logapplyuser: "张一鸣张一鸣",}},
//     function(err,docs){
//         if(err)
//         {
//             console.log(err);
//         }
//         console.log("修改成功:"+ docs)

//         mongoose.disconnect(function(err){
//             if(err)
//             {
//                 console.log("断开连接失败！")
//             }
//             console.log("断开连接成功！")
//         })
//     }
// )



//query
// zstorelogmodel.find(function(err,docs){
//     if(err){
//         console.log(err)
//     }
//     console.log("查询成功：" + docs);

//     mongoose.disconnect(function(err){
//         if(err)
//         {
//             console.log("断开连接失败！")
//         }
//         console.log("断开连接成功！")
//     })
// })


//close connect
// mongoose.disconnect(function(err){
//     if(err)
//     {
//         console.log("断开连接失败！")
//     }
//     console.log("断开连接成功！")
// })