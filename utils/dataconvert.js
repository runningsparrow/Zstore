// const xlsx = require('xlsx')

const XlsxPopulate = require('xlsx-populate')

convertaddr = function (path,file,filepassword){
    XlsxPopulate
    .fromFileAsync(path+file)
    .then(workbook => {
        console.log(workbook)
    })
    
    
    
}

const path = "D:/workspace/pyhon3/cipan/";

const file = "222.xlsx"

const filepassword = "111111"


wk = convertaddr(path,file,filepassword)


