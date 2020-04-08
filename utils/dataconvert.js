// const xlsx = require('xlsx')

const XlsxPopulate = require('xlsx-populate')

convertaddr = function (path,file,filepassword){
    XlsxPopulate
    .fromFileAsync(path+file,{password:filepassword})
    .then(workbook => {
        console.log(workbook)
    })
    
    
    
}

const path = "D:/workspace/pyhon3/cipan/";

const file = "张江主机新线磁盘统计表_测试开发 (20200324).xlsx"

const filepassword = "111111"


wk = convertaddr(path,file,filepassword)


