const xlsx = require('xlsx')
const diskaddr = require('../model/diskaddr');
const ctrlunit1 = require('../model/ctrlunit')
const sysplex_box = require('../model/sysplex_box')
const XXZJCPHZB = "新线主机磁盘汇总表"
const CPBGDJB = "磁盘变更登记表"
const XXCPAXTSYTJB = "新线磁盘按系统使用统计表"
const filep = require('./fileprocess')

//地址表初始设定

const DATALINE1 = 0
const DATALINE2 = 1
const DATALINE3 = 2
const DATALINE4 = 3

const CELLUNIT = 5

convertaddr1 = function(path,file){

    const wk = xlsx.readFile(path+file);
    // const first_sheet_name = wk.SheetNames[0]; // 获取工作簿中的工作表名字 
    // const sheetnum = wk.SheetNames.length;
    // console.log(sheetnum)
    // const sht = wk.Sheets[first_sheet_name]
    // console.log(sht)

    // for(var i=0;  i < wk.SheetNames.length; i++)
    var recordcount = 1
    // filep('diskdata',__dirname,'s',"")
    // for(var i=0;  i < 1; i++)
    for(var i=0;  i < wk.SheetNames.length; i++)
    {
        const shtname = wk.SheetNames[i]
        console.log(shtname)
        //保存数据范围数据

        const disakaddrdata =
        {
            diskaddrid: 1,
            diskaddraddr: "FFFF",
            diskaddrlabel: "",
            diskaddrtype: "",
            diskaddrsg: "",
            diskaddrplex: "",
            diskaddrcu: "",
            diskaddraddrzvm: "",
            diskaddruse: "",
            diskaddrenv: "",
            diskaddrbox: shtname,
            rmrk: "",
        }

        

        if (shtname !== XXZJCPHZB && shtname !== CPBGDJB) {

            const sht = wk.Sheets[shtname]
            //得到当前页内数据范围
            const range = xlsx.utils.decode_range(sht['!ref'])
            //保存数据范围数据
            var row_start = range.s.r;
            var row_end = range.e.r;
            const col_start = range.s.c;
            const col_end = range.e.c;
            var columname_data = []

            var celldata = []
            var columncount = 0
            var columncount1 = 0
            var diskaddrcuarrary = []
            var diskaddrusearrary = []
            


            
            // const j;
            // const addr;
            // const cell;
            //按行对 sheet 内的数据循环
            for(;row_start<=row_end;row_start++) {
                
                //读取当前行里面各个列的数据
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
                console.log(row_start)
                console.log(row_end)
                
                //用于每一行列数的累加
                var columndatacount = 0
                var insertflag = false

               

                for(j=col_start;j<=col_end;j++) {
                    const addr = xlsx.utils.encode_col(j) + xlsx.utils.encode_row(row_start);
                    console.log(addr)
                    const cell = sht[addr];
                    console.log("=====vvvvv=======")
                    console.log(cell)
                    console.log(typeof(cell))
                    if(row_start == DATALINE1)
                    {
                        if(typeof(cell) !== "undefined")
                        {   
                            if(cell.v !== "")
                            {
                                disakaddrdata.diskaddrenv = cell.v
                            }
                            else{
                                // disakaddrdata.diskaddruse = ""
                            }
                            
                        }
                        else{
                            // disakaddrdata.diskaddruse = ""
                        }
                         
                    };
                    if(row_start == DATALINE2)
                    {
                        if(typeof(cell) !== "undefined")
                        {
                            if(cell.v !== "")
                            {
                                // disakaddrdata.diskaddrcu = cell.v
                                diskaddrcuarrary.push(cell.v)
                            }
                            else{
                                // disakaddrdata.diskaddrcu = ""
                                diskaddrcuarrary.push("")
                            }
                        }
                        else{
                            // disakaddrdata.diskaddrcu = ""
                            diskaddrcuarrary.push("")
                        }
                    };
                    if(row_start == DATALINE3)
                    {
                        if(typeof(cell) !== "undefined")
                        {
                            if(cell.v !== "")
                            {
                                // disakaddrdata.di skaddruse = cell.v'
                                diskaddrusearrary.push(cell.v)
                            }
                            else{
                                // disakaddrdata.diskaddruse = ""
                                diskaddrusearrary.push("")
                            }
                        }
                        else{
                            // disakaddrdata.diskaddruse = ""
                            diskaddrusearrary.push("")
                        }
                    };
                    if(row_start == DATALINE4)
                    {
                        if(typeof(cell) !== "undefined")
                        {
                            if(cell.v !== "")
                            {
                                if(cell.v == "地址" && j == 0)
                                {
                                    // columname.push(cell.v)
                                    celldata.push(cell.v)
                                    celldata.push(columncount)
                                    celldata.push(columncount1)
                                    celldata.push("N")
                                    columname_data.push(celldata)
                                    celldata = []
                                }
                                if(cell.v !== "地址")
                                {
                                    // columname.push(cell.v)
                                    celldata.push(cell.v)
                                    celldata.push(columncount)
                                    celldata.push(columncount1)
                                    celldata.push("N")
                                    columname_data.push(celldata)
                                    celldata = []
                                }
                                if(cell.v == "地址" && j !== 0)
                                {
                                    // columname_data.push(columname)
                                    //  
                                    // columname.push(cell.v)
                                    celldata.push(cell.v)
                                    celldata.push(columncount)
                                    columncount1 = 0
                                    celldata.push(columncount1)
                                    celldata.push("N")
                                    columname_data.push(celldata)
                                    celldata = []
                                }
                            }else{
                                // columname.push(" ")
                                celldata.push(" ")
                                celldata.push(columncount)
                                celldata.push(columncount1)
                                celldata.push("N")
                                columname_data.push(celldata)
                                celldata = []
                            }
                        }else{
                            // columname.push(" ")
                            celldata.push(" ")
                            celldata.push(columncount)
                            celldata.push(columncount1)
                            celldata.push("N")
                            columname_data.push(celldata)
                            celldata = []
                        }
                        columncount ++;
                        columncount1 ++
                    }
                    if(row_start > DATALINE4)
                    {
                        k = j + 1;
                        
                        if(typeof(cell) !== "undefined")
                        {
                            if(columname_data[j][2] == 0)
                            {
                                disakaddrdata.diskaddraddr = cell.v
                                disakaddrdata.diskaddrcu = diskaddrcuarrary[j]
                                disakaddrdata.diskaddruse = diskaddrusearrary[j]
                                
                            }
                            if(columname_data[j][2] == 1)
                            {
                                disakaddrdata.diskaddrlabel = cell.v
                            }
                            if(columname_data[j][2] == 2)
                            {
                                disakaddrdata.diskaddrtype = cell.v
                            }
                            if(columname_data[j][2] == 3)
                            {
                                disakaddrdata.diskaddrsg = cell.v
                            }
                            console.log(columname_data[j][2])
                            
                            console.log(j)
                            console.log(k)
                            
                            if(k < columncount)
                            {
                                if(columname_data[j][2] == 4 && columname_data[k][2] == 0 )
                                {
                                    disakaddrdata.diskaddrplex = cell.v
                                    insertflag = true
                                }
                                if(columname_data[j][2] == 4 && columname_data[k][2] == 5 )
                                {
                                    disakaddrdata.diskaddraddrzvm = cell.v
                                }
                                else{
                                    disakaddrdata.diskaddraddrzvm = ""
                                }
                            }
                            // else 
                            // {
                                
                            //     if(k == columncount)
                            //     {
                            //         if(columname_data[j][2] == 4)
                            //         {
                            //             disakaddrdata.diskaddrplex = cell.v
                            //             insertflag = true
                            //         }
                            //         else
                            //         {
                            //             if(columname_data[j][2] == 5)
                            //             {
                            //                 disakaddrdata.diskaddrplex = cell.v
                            //                 insertflag = true
                            //             }
                            //         }
                                    
                            //     }
                                
                                

                            // }

                            if(k == columncount)
                            {
                                if(columname_data[j][2] == 4)
                                {
                                    disakaddrdata.diskaddrplex = cell.v
                                    insertflag = true
                                }
                                                                    
                            }
                            if(columname_data[j][2] == 5)
                            {
                                disakaddrdata.diskaddrplex = cell.v
                                insertflag = true
                            }    

                            
                            
                        }
                        else
                        {
                            if(columname_data[j][2] == 0)
                            {
                                disakaddrdata.diskaddraddr = ""
                            }
                            if(columname_data[j][2] == 1)
                            {
                                disakaddrdata.diskaddrlabel = ""
                            }
                            if(columname_data[j][2] == 2)
                            {
                                disakaddrdata.diskaddrtype = ""
                            }
                            if(columname_data[j][2] == 3)
                            {
                                disakaddrdata.diskaddrsg = ""
                            }
                            console.log(columname_data[j][2])
                            console.log("bugbugbug")
                            console.log(k)
                            console.log(columncount)
                            if(k < columncount)
                            {
                                if(columname_data[j][2] == 4 && columname_data[k][2]==0)
                                {
                                    disakaddrdata.diskaddrplex = ""
                                    insertflag = true
                                }
                                if(columname_data[j][2] == 4 && columname_data[k][2]==5)
                                {
                                    disakaddrdata.diskaddraddrzvm = ""
                                }
                            }
                            // else
                            // {
                            //     if(k = columncount)
                            //     {
                            //         if(columname_data[j][2] == 4)
                            //         {
                            //             disakaddrdata.diskaddrplex = ""
                            //             insertflag = true
                            //         }
                            //         else
                            //         {
                            //             if(columname_data[j][2] == 5)
                            //             {
                            //                 disakaddrdata.diskaddrplex = ""
                            //                 insertflag = true
                            //             }
                            //         }
                                    
                            //     }
                                
                                
                            // }

                            if(k == columncount)
                            {
                                if(columname_data[j][2] == 4)
                                {
                                    disakaddrdata.diskaddrplex = ""
                                    insertflag = true
                                }
                                
                                
                            }

                            if(columname_data[j][2] == 5)
                            {
                                disakaddrdata.diskaddrplex = ""
                                insertflag = true
                            }
                            
                        }

                        
                        

                        
                    }
                    
                    console.log("&&&&&&&hhhh&&&&&")
                    console.log(disakaddrdata.diskaddraddr)
                    
                    console.log(insertflag)
                    
                    if(insertflag == true && disakaddrdata.diskaddraddr !== "" && disakaddrdata.diskaddraddr !== " " && disakaddrdata.diskaddraddr !== "  ")
                    {
                        disakaddrdata.diskaddrid = recordcount
                        //do insert data
                        console.log("insert==========")
                        console.log(recordcount)
                        console.log(disakaddrdata)
                        // filep('diskdata',__dirname,'wa',JSON.stringify(disakaddrdata))

                        //insert database

                        diskaddr.create(
                            {

                                diskaddrid: disakaddrdata.diskaddrid,
                                //地址
                                diskaddraddr: disakaddrdata.diskaddraddr,
                                //卷名
                                diskaddrlabel: disakaddrdata.diskaddrlabel,
                                //TYPE
                                diskaddrtype: disakaddrdata.diskaddrtype,
                                //SG
                                diskaddrsg: disakaddrdata.diskaddrsg,
                                //PLEX
                                diskaddrplex: disakaddrdata.diskaddrplex,
                                diskaddrcu: disakaddrdata.diskaddrcu,
                                diskaddraddrzvm: disakaddrdata.diskaddraddrzvm,
                                diskaddruse: disakaddrdata.diskaddruse,
                                diskaddrenv: disakaddrdata.diskaddrenv,
                                diskaddrbox: disakaddrdata.diskaddrbox,
                                rmrk:disakaddrdata.rmrk
                            }
                        ).then(function(result){
                            console.log(result)
                            console.log("插入 diskaddr 数据成功！")
                        })

                        //set insertflag false
                        insertflag = false
                        recordcount = recordcount + 1

                        
                        
                    }
                    
                    

                }
                
                
                
            }
            console.log(col_start)
            console.log(columname_data)
        } 
        
    }

}


convertctrlunit = function(path,file){


    const wk = xlsx.readFile(path+file);


    
    // for(var i=0;  i < 1; i++)
    for(var i=0;  i < wk.SheetNames.length; i++)
    {
        const shtname = wk.SheetNames[i]
        console.log(shtname)
        //保存数据范围数据

        const ctrlunit =
        {
            ctrlunitid: 1,
            ctrlunitcuid: "",
            ctrlunitaddr: "",
            ctrlunit_m1_total: 0,
            ctrlunit_m1_used: 0,
            ctrlunit_m1_free: 0,
            ctrlunit_m3_total: 0,
            ctrlunit_m3_used: 0,
            ctrlunit_m3_free: 0,
            ctrlunit_m9_total: 0,
            ctrlunit_m9_used: 0,
            ctrlunit_m9_free: 0,
            ctrlunit_m27_total: 0,
            ctrlunit_m27_used: 0,
            ctrlunit_m27_free: 0,
            ctrlunit_m54_total: 0,
            ctrlunit_m54_used: 0,
            ctrlunit_m54_free: 0,
            ctrlunit_total: 0,
            ctrlunit_used: 0,
            ctrlunit_free: 0,
            ctrlunit_total_G: 0,
            ctrlunit_used_G: 0,
            ctrlunit_ratio: 0,
            ctrlunit_stauts: "",
            ctrlunit_diskbox: "",
            rmrk:"",
        }

        if (shtname == XXCPAXTSYTJB) {

            const sht = wk.Sheets[shtname]
            //得到当前页内数据范围
            const range = xlsx.utils.decode_range(sht['!ref'])
            //保存数据范围数据
            var row_start = range.s.r;
            var row_end = range.e.r;
            const col_start = range.s.c;
            const col_end = range.e.c;


            //按行对 sheet 内的数据循环
            var cucount = 0
            for(;row_start<=row_end;row_start++) {

                cuflag = false
                insertflag = false
                for(j=col_start;j<=col_end;j++) {

                    const addr = xlsx.utils.encode_col(j) + xlsx.utils.encode_row(row_start);
                    console.log(addr)
                    const cell = sht[addr];

                    

                    if(typeof(cell) !== "undefined")
                    {

                        if(j==0){

                           
                            var reg3 = new RegExp('[CU]\\w+\\S+');
                            
                            
                            
                            console.log(reg3.exec(cell.v))
                            
                            
                            
                            if(reg3.exec(cell.v) != null)
                            {
                                cucount ++;
                                //set up flag for this line which is cu line
                                cuflag = true

                                ctrlunit.ctrlunitid = cucount
                                ctrlunit.ctrlunitcuid = cell.v
                               


                            }
                        }

                        //address
                        if(j==1 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunitaddr = cell.v
                            }
                            
                        }

                        //m9
                        if(j==2 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_m9_total = cell.v
                            }
                            
                        }


                        if(j==3 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_m9_used = cell.v
                            }
                            
                        }

                        //m54
                        if(j==4 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_m54_total = cell.v
                            }
                            
                        }


                        if(j==5 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_m54_used = cell.v
                            }
                            
                        }


                        //m27
                        if(j==6 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_m27_total = cell.v
                            }
                            
                        }


                        if(j==7 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_m27_used = cell.v
                            }
                            
                        }


                        //m3
                        if(j==8 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_m3_total = cell.v
                            }
                            
                        }


                        if(j==9 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_m3_used = cell.v
                            }
                            
                        }


                        //1
                        if(j==10 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_m1_total = cell.v
                            }
                            
                        }


                        if(j==11 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_m1_used = cell.v
                            }
                            
                        }

                        //total
                        if(j==12 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_total = cell.v
                            }
                            
                        }


                        if(j==13 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_used = cell.v
                            }
                            
                        }


                        //total g
                        if(j==14 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_total_G = cell.v
                            }
                            
                        }


                        if(j==15 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_used_G = cell.v
                            }
                            
                        }


                        //ratio
                        if(j==16 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_ratio = cell.v
                            }
                            
                        }


                        //status
                        if(j==17 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_stauts = cell.v
                            }
                            
                        }


                        //diskbox

                        if(j==18 && cuflag == true)
                        {
                            if(cell.v !== "undefined")
                            {
                                ctrlunit.ctrlunit_diskbox = cell.v

                                

                                
                            }
                            
                            cuflag = false
                            insertflag = true

                            
                        }


                        // console.log(cell.v)
                        console.log(j)
                    }
                    else
                    {
                        // console.log("undefined")
                        console.log(j)
                    }
                    


                }

                if(insertflag == true)
                {
                    console.log(ctrlunit)
                    filep('cudata',__dirname,'wa',JSON.stringify(ctrlunit))

                    //write db

                    ctrlunit1.create(
                        {
                            ctrlunitid:ctrlunit.ctrlunitid ,
                            ctrlunitcuid:ctrlunit.ctrlunitcuid ,
                            ctrlunitaddr:ctrlunit.ctrlunitaddr ,
                            ctrlunit_m1_total:ctrlunit.ctrlunit_m1_total,
                            ctrlunit_m1_used:ctrlunit.ctrlunit_m1_used ,
                            ctrlunit_m1_free:ctrlunit.ctrlunit_m1_free ,
                            ctrlunit_m3_total:ctrlunit.ctrlunit_m3_total ,
                            ctrlunit_m3_used:ctrlunit.ctrlunit_m3_used,
                            ctrlunit_m3_free:ctrlunit.ctrlunit_m3_free ,
                            ctrlunit_m9_total:ctrlunit.ctrlunit_m9_total,
                            ctrlunit_m9_used:ctrlunit.ctrlunit_m9_used ,
                            ctrlunit_m9_free:ctrlunit.ctrlunit_m9_free ,
                            ctrlunit_m27_total:ctrlunit.ctrlunit_m27_total ,
                            ctrlunit_m27_used:ctrlunit.ctrlunit_m27_used ,
                            ctrlunit_m27_free:ctrlunit.ctrlunit_m27_free,
                            ctrlunit_m54_total:ctrlunit.ctrlunit_m54_total ,
                            ctrlunit_m54_used:ctrlunit.ctrlunit_m54_used ,
                            ctrlunit_m54_free:ctrlunit.ctrlunit_m54_free ,
                            ctrlunit_total:ctrlunit.ctrlunit_total,
                            ctrlunit_used: ctrlunit.ctrlunit_used,
                            ctrlunit_free:ctrlunit.ctrlunit_free,
                            ctrlunit_total_G: ctrlunit.ctrlunit_total_G,
                            ctrlunit_used_G: ctrlunit.ctrlunit_used_G,
                            ctrlunit_ratio: ctrlunit.ctrlunit_ratio,
                            ctrlunit_stauts: ctrlunit.ctrlunit_stauts,
                            ctrlunit_diskbox: ctrlunit.ctrlunit_diskbox,
                            rmrk : ctrlunit.rmrk
                        }
                    ).then(function(result){
                        console.log(result)
                        console.log("插入ctrlunit数据成功！")
                    })


                    insertflag = false
                }
            
            
            } // end loop of all data lines

            console.log("number of all cus")
            console.log(cucount)


        }


    }

}



convertsysplex = function(path,file){
    const wk = xlsx.readFile(path+file);


    // for(var i=0;  i < 1; i++)
    for(var i=0;  i < wk.SheetNames.length; i++)
    {
        const shtname = wk.SheetNames[i]
        console.log(shtname)


        //保存数据范围数据

        const sysplexboxdata =
        {
            sysplex_boxid: 1,
            sysplex: "",
            sysplex_diskbox: "",
            sysplex_appl: "",
            sysplex_total_G: 0,
            sysplex_used_G: 0,
            sysplex_free_G: 0,
            sysplex_box_m1_total: 0,
            sysplex_box_m1_used: 0,
            sysplex_box_m1_free: 0,
            sysplex_box_m3_total: 0,
            sysplex_box_m3_used: 0,
            sysplex_box_m3_free: 0,
            sysplex_box_m9_total: 0,
            sysplex_box_m9_used: 0,
            sysplex_box_m9_free: 0,
            sysplex_box_m27_total: 0,
            sysplex_box_m27_used: 0,
            sysplex_box_m27_free: 0,
            sysplex_box_m54_total: 0,
            sysplex_box_m54_used: 0,
            sysplex_box_m54_free: 0,
            rmrk: ""
        }


        if (shtname == XXZJCPHZB) {

            const sht = wk.Sheets[shtname]
            //得到当前页内数据范围
            const range = xlsx.utils.decode_range(sht['!ref'])
            //保存数据范围数据
            var row_start = range.s.r;
            var row_end = range.e.r;
            const col_start = range.s.c;
            const col_end = range.e.c;

            

            
            //按行对 sheet 内的数据循环

            var sysplexcount = 0
           
            var boxarray1 =  []
            
            var boxarray2 = []

            var boxarray3 = []


            


            for(;row_start<=row_end;row_start++) {

                insertflag = false
                for(j=col_start;j<=col_end;j++) {

                    //init

                    sysplex_boxidb = 1
                    sysplex= ""
                    sysplex_diskbox= ""
                    sysplex_appl= ""
                    sysplex_total_G= 0
                    sysplex_used_G= 0
                    sysplex_free_G= 0
                    sysplex_box_m1_total=0
                    sysplex_box_m1_used=0
                    sysplex_box_m1_free=0
                    sysplex_box_m3_total= 0
                    sysplex_box_m3_used=0
                    sysplex_box_m3_free=0
                    sysplex_box_m9_total=0
                    sysplex_box_m9_used= 0
                    sysplex_box_m9_free= 0
                    sysplex_box_m27_total= 0
                    sysplex_box_m27_used= 0
                    sysplex_box_m27_free= 0
                    sysplex_box_m54_total= 0
                    sysplex_box_m54_used= 0
                    sysplex_box_m54_free= 0
                    rmrk=""


                    const addr = xlsx.utils.encode_col(j) + xlsx.utils.encode_row(row_start);
                    // console.log(addr)
                    const cell = sht[addr];


                    // if(typeof(cell) !== "undefined")
                    // {

                        //process diskbox
                        if(row_start == 0)
                        {
                            // if(cell.v !== "undefined")
                            if(typeof(cell) !== "undefined")
                            {

                                var reg2 = new RegExp('[Cuspv]\\w+\\s+\\S+');
                            
                            
                                

                                var reg3 = new RegExp('[Cuspv]\\s+\\S+');
                            
                            
                                

                                var reg4 = new RegExp('[EMC]\\s+\\S+');

                                


                                var reg5 = new RegExp('[DS]\\d+');

                                
                                
                                
                                
                                if(reg2.exec(cell.v) != null || reg3.exec(cell.v) != null || reg4.exec(cell.v) != null || reg5.exec(cell.v) != null)
                                {
                                    var boxdata1 = {
                                        diskbox: "",
                                        diskboxcolumn: ""
                                    }
                                    
                                   
                                    boxdata1.diskbox = cell.v
                                    boxdata1.diskboxcolumn = j
                                    boxarray1.push(boxdata1)
                                    // console.log(boxarray1)

                                }
                            }
                        }


                        //line 15
                        if(row_start == 15)
                        {
                            
                            // if(cell.v !== "undefined")
                            if(typeof(cell) !== "undefined")
                            {
                                var reg2 = new RegExp('[M]\\d+');
                            
                            
                                
                                if(reg2.exec(cell.v) != null)
                                {
                                   
                                    
                                    for(var i =0; i< boxarray1.length; i++)
                                    {
                                        if (i < boxarray1.length - 1)
                                        {
                                            if (j >= boxarray1[i].diskboxcolumn && j < boxarray1[i+1].diskboxcolumn){


                                                var boxdata2 = {
                                                    diskbox: "",
                                                    diskboxcolumn: "",
                                                    diskboxtype: "",
                                                    diskboxtypelast: "N"
                                                }
                                                // console.log(i)
                                                // console.log(boxarray1[i].diskbox)
                                                boxdata2.diskbox = boxarray1[i].diskbox
                                                boxdata2.diskboxcolumn = j
                                                boxdata2.diskboxtype = cell.v

                                                
                                                if((j+3) == boxarray1[i+1].diskboxcolumn)
                                                {
                                                    console.log("xxxxxxxxxxxxxxxxxxxxxxxx")
                                                    boxdata2.diskboxtypelast = "Y"
                                                }
    
                                                boxarray2.push(boxdata2)
                                                

                                                

                                                //set i to end loop
                                                i = boxarray1.length;
    
                                                
                                            }
                                        }

                                        if (i == boxarray1.length - 1)
                                        {
                                            if (j >= boxarray1[i].diskboxcolumn){
                                                
                                                var boxdata2 = {
                                                    diskbox: "",
                                                    diskboxcolumn: "",
                                                    diskboxtype: "",
                                                    diskboxtypelast: "N"
                                                }
                                               
                                                boxdata2.diskbox = boxarray1[i].diskbox
                                                boxdata2.diskboxcolumn = j
                                                boxdata2.diskboxtype = cell.v

                                                if((j+2) == col_end)
                                                {
                                                    boxdata2.diskboxtypelast = "Y"
                                                }

    
                                                boxarray2.push(boxdata2)
                                                
                                                //set i to end loop
                                                i = boxarray1.length;

                                            }
                                        }
                                        
                                    }
                                }

                                
                            }

                        }



                        //line 16
                        if(row_start == 16)
                        {
                            // if(cell.v !== "undefined")
                            if(typeof(cell) !== "undefined")
                            {
                                var reg2 = new RegExp('[Total|Used|Free]');
                            
                            
                                
                                if(reg2.exec(cell.v) != null)
                                {

                                    console.log(cell.v)
                                    for(var i =0; i< boxarray2.length; i++)
                                    {
                                        if (i < boxarray2.length - 1)
                                        {
                                            if (j >= boxarray2[i].diskboxcolumn && j < boxarray2[i+1].diskboxcolumn){


                                                var boxdata3 = {
                                                    diskbox: "",
                                                    diskboxcolumn: "",
                                                    diskboxtype: "",
                                                    diskboxtypekind: "",
                                                    lastflag: "N"
                                                }
                                                
                                                boxdata3.diskbox = boxarray2[i].diskbox
                                                boxdata3.diskboxcolumn = j
                                                boxdata3.diskboxtype = boxarray2[i].diskboxtype
                                                boxdata3.diskboxtypekind = cell.v
                                                boxdata3.lastflag = "N"

                                                if((j+1) == boxarray2[i+1].diskboxcolumn && boxarray2[i].diskboxtypelast == "Y")
                                                {
                                                    boxdata3.lastflag = "Y"
                                                }
    
                                                boxarray3.push(boxdata3)
                                                
                                                //set i to end loop
                                                i = boxarray2.length;
    
                                                
                                            }
                                        }


                                        if (i == boxarray2.length - 1)
                                        {
                                            if (j >= boxarray2[i].diskboxcolumn){
                                                
                                                var boxdata3 = {
                                                    diskbox: "",
                                                    diskboxcolumn: "",
                                                    diskboxtype: "",
                                                    diskboxtypekind: "",
                                                    lastflag: "N"
                                                }
                                               
                                                boxdata3.diskbox = boxarray2[i].diskbox
                                                boxdata3.diskboxcolumn = j
                                                boxdata3.diskboxtype = boxarray2[i].diskboxtype
                                                boxdata3.diskboxtypekind = cell.v
                                                boxdata3.lastflag = "N"

                                                if(j == col_end)
                                                {
                                                    boxdata3.lastflag = "Y"
                                                }
    
                                                boxarray3.push(boxdata3)
                                                
                                                //set i to end loop
                                                i = boxarray2.length;

                                            }
                                        }

                                    }


                                }

                            }
                            
                        }


                        //process sysplex
                        if(row_start >= 17 && row_start <= 67)
                        {
                            //plex
                            if(j == 0)
                            {
                                // if(cell.v !== "undefined")
                                if(typeof(cell) !== "undefined")
                                {
                                    sysplexcount ++;



                                    sysplexboxdata.sysplex_boxid = sysplexcount
                                    sysplexboxdata.sysplex = cell.v

                                   
                                    // console.log(cell.v)
                                }    
                            }

                            //应用
                            if(j == 1)
                            {
                                // if(cell.v !== "undefined")
                                if(typeof(cell) !== "undefined")
                                {
                                    
                                    sysplexboxdata.sysplex_appl = cell.v
                                   
                                }    
                            }

                            //Total
                            if(j == 2)
                            {
                                // if(cell.v !== "undefined")
                                if(typeof(cell) !== "undefined")
                                {
                                    
                                    sysplexboxdata.sysplex_total_G = cell.v
                                   
                                }    
                            }

                            //Used
                            if(j == 3)
                            {
                                // if(cell.v !== "undefined")
                                if(typeof(cell) !== "undefined")
                                {
                                    
                                    sysplexboxdata.sysplex_used_G = cell.v
                                   
                                }    
                            }


                            //Free
                            if(j == 4)
                            {
                                // if(cell.v !== "undefined")
                                if(typeof(cell) !== "undefined")
                                {
                                    
                                    sysplexboxdata.sysplex_free_G = cell.v
                                   
                                }    
                            }


                            //make box data of this sysplex
                            if(j >= 10)
                            {

                                
                                for(var i = 0 ; i < boxarray3.length; i++)
                                {
                                    // console.log("start array3 loop ")
                                    // console.log(boxarray3[i].diskboxcolumn)
                                    // console.log(j)
                                    
                                    if(boxarray3[i].diskboxcolumn == j)
                                    {
                                        
                                        ////////////M1

                                        // console.log("xxxxxxxxxxxxxxx")
                                        // console.log(boxarray3[i].diskboxtype)
                                        // console.log(boxarray3[i].diskbox)
                                        
                                        if(boxarray3[i].diskboxtype == "M1" && boxarray3[i].diskboxtypekind == "Total" )
                                        {

                                            
                                            
                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m1_total = cell.v
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m1_total = 0
                                            }
                                        }

                                        if(boxarray3[i].diskboxtype == "M1" && boxarray3[i].diskboxtypekind == "Used" )
                                        {
                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m1_used = cell.v
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m1_used = 0
                                            }
                                        }

                                        if(boxarray3[i].diskboxtype == "M1" && boxarray3[i].diskboxtypekind == "Free" )
                                        {
                                            // console.log("m1")
                                            // console.log(boxarray3[i].diskbox)

                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m1_free = cell.v

                                                
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m1_free = 0
                                                
                                            }

                                            if(boxarray3[i].lastflag == "Y")
                                            {
                                                // console.log(boxarray3[i].diskbox)
                                                sysplexboxdata.sysplex_diskbox = boxarray3[i].diskbox
                                                //write file 
                                                filep('sysplexdata',__dirname,'wa',JSON.stringify(sysplexboxdata))
                                                //write db
                                                sysplex_box.create(
                                                    {
                                                        sysplex_boxid: sysplexboxdata.sysplex_boxid,
                                                        sysplex: sysplexboxdata.sysplex,
                                                        sysplex_diskbox: sysplexboxdata.sysplex_diskbox,
                                                        sysplex_appl: sysplexboxdata.sysplex_appl,
                                                        sysplex_total_G: sysplexboxdata.sysplex_used_G,
                                                        sysplex_used_G: sysplexboxdata.sysplex_used_G,
                                                        sysplex_free_G:sysplexboxdata.sysplex_free_G,
                                                        sysplex_box_m1_total:sysplexboxdata.sysplex_box_m1_total,
                                                        sysplex_box_m1_used:sysplexboxdata.sysplex_box_m1_used,
                                                        sysplex_box_m1_free:sysplexboxdata.sysplex_box_m1_free,
                                                        sysplex_box_m3_total:sysplexboxdata.sysplex_box_m3_total,
                                                        sysplex_box_m3_used:sysplexboxdata.sysplex_box_m3_used,
                                                        sysplex_box_m3_free:sysplexboxdata.sysplex_box_m3_free,
                                                        sysplex_box_m9_total:sysplexboxdata.sysplex_box_m9_total,
                                                        sysplex_box_m9_used:sysplexboxdata.sysplex_box_m9_used,
                                                        sysplex_box_m9_free:sysplexboxdata.sysplex_box_m9_free,
                                                        sysplex_box_m27_total:sysplexboxdata.sysplex_box_m27_total,
                                                        sysplex_box_m27_used:sysplexboxdata.sysplex_box_m27_total,
                                                        sysplex_box_m27_free:sysplexboxdata.sysplex_box_m27_free,
                                                        sysplex_box_m54_total:sysplexboxdata.sysplex_box_m54_total,
                                                        sysplex_box_m54_used:sysplexboxdata.sysplex_box_m54_used,
                                                        sysplex_box_m54_free:sysplexboxdata.sysplex_box_m54_free,
                                                        rmrk:sysplexboxdata.rmrk,
                                                    }
                                                ).then(function(result){
                                                    console.log(result)
                                                    console.log("插入sysplex_box数据成功！")
                                                })
                                            }
                                        }
                                        ///////////M3

                                        if(boxarray3[i].diskboxtype == "M3" && boxarray3[i].diskboxtypekind == "Total" )
                                        {
                                           

                                           

                                            

                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m3_total = cell.v
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m3_total = 0
                                            }
                                        }

                                        if(boxarray3[i].diskboxtype == "M3" && boxarray3[i].diskboxtypekind == "Used" )
                                        {
                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m3_used = cell.v
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m3_used = 0
                                            }
                                        }

                                        if(boxarray3[i].diskboxtype == "M3" && boxarray3[i].diskboxtypekind == "Free" )
                                        {
                                            // console.log("m3")
                                            // console.log(boxarray3[i].diskbox)
                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m3_free = cell.v

                                                
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m3_free = 0
                                            }

                                            if(boxarray3[i].lastflag == "Y")
                                            {

                                                // console.log(boxarray3[i].diskbox)
                                                sysplexboxdata.sysplex_diskbox = boxarray3[i].diskbox
                                                //write file 
                                                filep('sysplexdata',__dirname,'wa',JSON.stringify(sysplexboxdata))
                                                //write db
                                                sysplex_box.create(
                                                    {
                                                        sysplex_boxid: sysplexboxdata.sysplex_boxid,
                                                        sysplex: sysplexboxdata.sysplex,
                                                        sysplex_diskbox: sysplexboxdata.sysplex_diskbox,
                                                        sysplex_appl: sysplexboxdata.sysplex_appl,
                                                        sysplex_total_G: sysplexboxdata.sysplex_used_G,
                                                        sysplex_used_G: sysplexboxdata.sysplex_used_G,
                                                        sysplex_free_G:sysplexboxdata.sysplex_free_G,
                                                        sysplex_box_m1_total:sysplexboxdata.sysplex_box_m1_total,
                                                        sysplex_box_m1_used:sysplexboxdata.sysplex_box_m1_used,
                                                        sysplex_box_m1_free:sysplexboxdata.sysplex_box_m1_free,
                                                        sysplex_box_m3_total:sysplexboxdata.sysplex_box_m3_total,
                                                        sysplex_box_m3_used:sysplexboxdata.sysplex_box_m3_used,
                                                        sysplex_box_m3_free:sysplexboxdata.sysplex_box_m3_free,
                                                        sysplex_box_m9_total:sysplexboxdata.sysplex_box_m9_total,
                                                        sysplex_box_m9_used:sysplexboxdata.sysplex_box_m9_used,
                                                        sysplex_box_m9_free:sysplexboxdata.sysplex_box_m9_free,
                                                        sysplex_box_m27_total:sysplexboxdata.sysplex_box_m27_total,
                                                        sysplex_box_m27_used:sysplexboxdata.sysplex_box_m27_total,
                                                        sysplex_box_m27_free:sysplexboxdata.sysplex_box_m27_free,
                                                        sysplex_box_m54_total:sysplexboxdata.sysplex_box_m54_total,
                                                        sysplex_box_m54_used:sysplexboxdata.sysplex_box_m54_used,
                                                        sysplex_box_m54_free:sysplexboxdata.sysplex_box_m54_free,
                                                        rmrk:sysplexboxdata.rmrk,
                                                    }
                                                ).then(function(result){
                                                    console.log(result)
                                                    console.log("插入sysplex_box数据成功！")
                                                })
                                            }

                    
                                        }

                                        ///////////////////M9
                                        if(boxarray3[i].diskboxtype == "M9" && boxarray3[i].diskboxtypekind == "Total" )
                                        {

                                            
                                           
                                            
                                            

                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m9_total = cell.v
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m9_total = 0
                                            }
                                        }

                                        if(boxarray3[i].diskboxtype == "M9" && boxarray3[i].diskboxtypekind == "Used" )
                                        {
                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m9_used = cell.v
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m9_used = 0
                                            }
                                        }

                                        if(boxarray3[i].diskboxtype == "M9" && boxarray3[i].diskboxtypekind == "Free" )
                                        {
                                            // console.log("m9")
                                            // console.log(boxarray3[i].diskbox)
                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m9_free = cell.v
                                               
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m9_free = 0
                                            }

                                            if(boxarray3[i].lastflag == "Y")
                                            {
                                                // console.log(boxarray3[i].diskbox)
                                                sysplexboxdata.sysplex_diskbox = boxarray3[i].diskbox
                                                //write file 
                                                filep('sysplexdata',__dirname,'wa',JSON.stringify(sysplexboxdata))
                                                //write db
                                                sysplex_box.create(
                                                    {
                                                        sysplex_boxid: sysplexboxdata.sysplex_boxid,
                                                        sysplex: sysplexboxdata.sysplex,
                                                        sysplex_diskbox: sysplexboxdata.sysplex_diskbox,
                                                        sysplex_appl: sysplexboxdata.sysplex_appl,
                                                        sysplex_total_G: sysplexboxdata.sysplex_used_G,
                                                        sysplex_used_G: sysplexboxdata.sysplex_used_G,
                                                        sysplex_free_G:sysplexboxdata.sysplex_free_G,
                                                        sysplex_box_m1_total:sysplexboxdata.sysplex_box_m1_total,
                                                        sysplex_box_m1_used:sysplexboxdata.sysplex_box_m1_used,
                                                        sysplex_box_m1_free:sysplexboxdata.sysplex_box_m1_free,
                                                        sysplex_box_m3_total:sysplexboxdata.sysplex_box_m3_total,
                                                        sysplex_box_m3_used:sysplexboxdata.sysplex_box_m3_used,
                                                        sysplex_box_m3_free:sysplexboxdata.sysplex_box_m3_free,
                                                        sysplex_box_m9_total:sysplexboxdata.sysplex_box_m9_total,
                                                        sysplex_box_m9_used:sysplexboxdata.sysplex_box_m9_used,
                                                        sysplex_box_m9_free:sysplexboxdata.sysplex_box_m9_free,
                                                        sysplex_box_m27_total:sysplexboxdata.sysplex_box_m27_total,
                                                        sysplex_box_m27_used:sysplexboxdata.sysplex_box_m27_total,
                                                        sysplex_box_m27_free:sysplexboxdata.sysplex_box_m27_free,
                                                        sysplex_box_m54_total:sysplexboxdata.sysplex_box_m54_total,
                                                        sysplex_box_m54_used:sysplexboxdata.sysplex_box_m54_used,
                                                        sysplex_box_m54_free:sysplexboxdata.sysplex_box_m54_free,
                                                        rmrk:sysplexboxdata.rmrk,
                                                    }
                                                ).then(function(result){
                                                    console.log(result)
                                                    console.log("插入sysplex_box数据成功！")
                                                })
                                            }
                                        }

                                        ///////M27

                                        if(boxarray3[i].diskboxtype == "M27" && boxarray3[i].diskboxtypekind == "Total" )
                                        {
                                           

                                            

                                            

                                            

                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m27_total = cell.v
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m27_total = 0
                                            }
                                        }

                                        if(boxarray3[i].diskboxtype == "M27" && boxarray3[i].diskboxtypekind == "Used" )
                                        {
                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m27_used = cell.v
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m27_used = 0
                                            }
                                        }

                                        if(boxarray3[i].diskboxtype == "M27" && boxarray3[i].diskboxtypekind == "Free" )
                                        {
                                            // console.log("m27")
                                            // console.log(boxarray3[i].diskbox)
                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m27_free = cell.v
                                                
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m27_free = 0
                                            }

                                            if(boxarray3[i].lastflag == "Y")
                                            {

                                                // console.log(boxarray3[i].diskbox)
                                                sysplexboxdata.sysplex_diskbox = boxarray3[i].diskbox
                                                //write file 
                                                filep('sysplexdata',__dirname,'wa',JSON.stringify(sysplexboxdata))
                                                //write db
                                                sysplex_box.create(
                                                    {
                                                        sysplex_boxid: sysplexboxdata.sysplex_boxid,
                                                        sysplex: sysplexboxdata.sysplex,
                                                        sysplex_diskbox: sysplexboxdata.sysplex_diskbox,
                                                        sysplex_appl: sysplexboxdata.sysplex_appl,
                                                        sysplex_total_G: sysplexboxdata.sysplex_used_G,
                                                        sysplex_used_G: sysplexboxdata.sysplex_used_G,
                                                        sysplex_free_G:sysplexboxdata.sysplex_free_G,
                                                        sysplex_box_m1_total:sysplexboxdata.sysplex_box_m1_total,
                                                        sysplex_box_m1_used:sysplexboxdata.sysplex_box_m1_used,
                                                        sysplex_box_m1_free:sysplexboxdata.sysplex_box_m1_free,
                                                        sysplex_box_m3_total:sysplexboxdata.sysplex_box_m3_total,
                                                        sysplex_box_m3_used:sysplexboxdata.sysplex_box_m3_used,
                                                        sysplex_box_m3_free:sysplexboxdata.sysplex_box_m3_free,
                                                        sysplex_box_m9_total:sysplexboxdata.sysplex_box_m9_total,
                                                        sysplex_box_m9_used:sysplexboxdata.sysplex_box_m9_used,
                                                        sysplex_box_m9_free:sysplexboxdata.sysplex_box_m9_free,
                                                        sysplex_box_m27_total:sysplexboxdata.sysplex_box_m27_total,
                                                        sysplex_box_m27_used:sysplexboxdata.sysplex_box_m27_total,
                                                        sysplex_box_m27_free:sysplexboxdata.sysplex_box_m27_free,
                                                        sysplex_box_m54_total:sysplexboxdata.sysplex_box_m54_total,
                                                        sysplex_box_m54_used:sysplexboxdata.sysplex_box_m54_used,
                                                        sysplex_box_m54_free:sysplexboxdata.sysplex_box_m54_free,
                                                        rmrk:sysplexboxdata.rmrk,
                                                    }
                                                ).then(function(result){
                                                    console.log(result)
                                                    console.log("插入sysplex_box数据成功！")
                                                })
                                            }
                                        }



                                        /////////M54

                                        if(boxarray3[i].diskboxtype == "M54" && boxarray3[i].diskboxtypekind == "Total" )
                                        {
                                           


                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m54_total = cell.v
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m54_total = 0
                                            }
                                        }

                                        if(boxarray3[i].diskboxtype == "M54" && boxarray3[i].diskboxtypekind == "Used" )
                                        {
                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m54_used = cell.v
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m54_used = 0
                                            }
                                        }

                                        if(boxarray3[i].diskboxtype == "M54" && boxarray3[i].diskboxtypekind == "Free" )
                                        {
                                            // console.log("m54")
                                            // console.log(boxarray3[i].diskbox)
                                            
                                            // if(cell.v !== "undefined")
                                            if(typeof(cell) !== "undefined")
                                            {
                                                sysplexboxdata.sysplex_box_m54_free = cell.v
                                               
                                            }
                                            else 
                                            {
                                                sysplexboxdata.sysplex_box_m54_free = 0
                                            }


                                            if(boxarray3[i].lastflag == "Y")
                                            {
                                                // console.log(boxarray3[i].diskbox)
                                                sysplexboxdata.sysplex_diskbox = boxarray3[i].diskbox
                                                //write file 
                                                filep('sysplexdata',__dirname,'wa',JSON.stringify(sysplexboxdata))
                                                //write db
                                                sysplex_box.create(
                                                    {
                                                        sysplex_boxid: sysplexboxdata.sysplex_boxid,
                                                        sysplex: sysplexboxdata.sysplex,
                                                        sysplex_diskbox: sysplexboxdata.sysplex_diskbox,
                                                        sysplex_appl: sysplexboxdata.sysplex_appl,
                                                        sysplex_total_G: sysplexboxdata.sysplex_used_G,
                                                        sysplex_used_G: sysplexboxdata.sysplex_used_G,
                                                        sysplex_free_G:sysplexboxdata.sysplex_free_G,
                                                        sysplex_box_m1_total:sysplexboxdata.sysplex_box_m1_total,
                                                        sysplex_box_m1_used:sysplexboxdata.sysplex_box_m1_used,
                                                        sysplex_box_m1_free:sysplexboxdata.sysplex_box_m1_free,
                                                        sysplex_box_m3_total:sysplexboxdata.sysplex_box_m3_total,
                                                        sysplex_box_m3_used:sysplexboxdata.sysplex_box_m3_used,
                                                        sysplex_box_m3_free:sysplexboxdata.sysplex_box_m3_free,
                                                        sysplex_box_m9_total:sysplexboxdata.sysplex_box_m9_total,
                                                        sysplex_box_m9_used:sysplexboxdata.sysplex_box_m9_used,
                                                        sysplex_box_m9_free:sysplexboxdata.sysplex_box_m9_free,
                                                        sysplex_box_m27_total:sysplexboxdata.sysplex_box_m27_total,
                                                        sysplex_box_m27_used:sysplexboxdata.sysplex_box_m27_total,
                                                        sysplex_box_m27_free:sysplexboxdata.sysplex_box_m27_free,
                                                        sysplex_box_m54_total:sysplexboxdata.sysplex_box_m54_total,
                                                        sysplex_box_m54_used:sysplexboxdata.sysplex_box_m54_used,
                                                        sysplex_box_m54_free:sysplexboxdata.sysplex_box_m54_free,
                                                        rmrk:sysplexboxdata.rmrk,
                                                    }
                                                ).then(function(result){
                                                    console.log(result)
                                                    console.log("插入sysplex_box数据成功！")
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                            
                            
                        }
                        
                    // }

                    

                }

            } //end of loop rows

            // console.log("boxarray1+++++++")

            // console.log(boxarray1)

            // console.log("boxarray2+++++++")

            // console.log(boxarray2)


            // console.log("boxarray3+++++++")

            // console.log(boxarray3)



        }

    }

}



//
// const XlsxPopulate = require('xlsx-populate')

// convertaddr = function (path,file){
//     XlsxPopulate
//     .fromFileAsync(path+file)
//     .then(workbook => {
//         console.log(workbook)

//     })
// }


//addr
// const path = "D:/workspace/pyhon3/cipan/";
const path = "D:/workspace/nodejs/cipan/";

const file = "template1.xlsx"

// wk = convertaddr(path,file)

convertaddr1(path,file)

//control unit
// const path = "D:/workspace/nodejs/cipan/";

// const file = "template2.xlsx"


// convertctrlunit(path,file)


//sysplex
// const path = "D:/workspace/nodejs/cipan/";

// const file = "template1.xlsx"


// convertsysplex(path,file)

