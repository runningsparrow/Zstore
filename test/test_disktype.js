const disktype = require('../model/disktype');

//容量
//0.94561 2.83684 8.51053 27.844 55.6664


//新增
disktype.create(
    {
        storetypeid: 1,
        storagetype: 'M1',
        storeamount: 0.94561,
        rmrk: '模1',
        createtime: new Date(),
        updatetime: new Date()
    }
).then(function(result){
    console.log(result)
    console.log("插入数据成功！")
})

// disktype.create(
//     {
//         storetypeid: 2,
//         storagetype: 'M3',
//         rmrk: '模3',
//         createtime: new Date(),
//         updatetime: new Date()
//     }
// ).then(function(result){
//     console.log(result)
//     console.log("插入数据成功！")

// })

//修改

// disktype.update(
//     {
//         rmrk: "模3",
//         updatetime: new Date()
//     },
//     {
//         where: {
//             storetypeid: 2
//         }
//     }   
// ).then((result)=>{
//     console.log(result)
//     console.log("修改数据成功")
// }).catch((err)=>{
//     console.log(err)
//     console.log("没有修改数据")
// })

//删除
// disktype.destroy(
//     {
//         where: {
//             storetypeid: 2
//         }
//     }
// ).then((result)=>{
//     console.log(result)
//     console.log("删除数据成功")
// }).catch((err)=>{
//     console.log(err)
//     console.log("没有删除数据")
// })


//查询

// disktype.findAll(
// //   {
// //     where: {
// //       attr1: {
// //         $gt: 50
// //       },
// //       attr2: {
// //         $lte: 45
// //       },
// //       attr3: {
// //         $in: [1,2,3]
// //       },
// //       attr4: {
// //         $ne: 5
// //       }
// //     }
// //   }
// ).then(function(result){
//     console.log(result)
// })

