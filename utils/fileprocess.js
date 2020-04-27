const fs = require("fs");
const os = require('os');




const filepro = function(filename,path=__dirname,action,data)
{
    
    localfile = path + '/' + filename
    //action 
    //读
    if (action == 'r')
    {

    }
    
    //获取信息
    if (action == 's')
    {
        fs.statSync(localfile,function(err,stats){
            if(err)
            {
                return console.error(err)

            }
           if (stats.isFile()){

                //删除文件
                fs.unlinkSync(localfile, function(err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log("delete file！");
                 });

           }
           else{
               console.log("no need to delete file!")
           }
        })
    }


    //写
    if(action == 'a')
    {

    }


    //追加写
    if (action == 'wa')
    {


        let fd;

        try {
            fd = fs.openSync(localfile, 'a');
            fs.appendFileSync(fd, data, 'utf8');
            } catch (err) {
            /* 处理错误 */
            } finally {
            if (fd !== undefined)
                fs.closeSync(fd);
        }

        try {
            fd = fs.openSync(localfile, 'a');
            fs.appendFileSync(fd, os.EOL, 'utf8');
            } catch (err) {
            /* 处理错误 */
            } finally {
            if (fd !== undefined)
                fs.closeSync(fd);
        }

    }



}


module.exports = filepro