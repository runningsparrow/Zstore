const xlsx = require('xlsx')
const diskaddr = require('../model/diskaddr');
const XXZJCPHZB = "新线主机磁盘汇总表"
const CPBGDJB = "磁盘变更登记表 "

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
    for(var i=0;  i < 1; i++)
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

                var tempaddr = ""

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
                                
                            //     if(k = columncount)
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

                            if(k = columncount)
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

                            if(k = columncount)
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
                    console.log(tempaddr)
                    console.log(insertflag)
                    // if(insertflag == true && tempaddr !== disakaddrdata.diskaddraddr && disakaddrdata.diskaddraddr !== "")
                    if(insertflag == true && disakaddrdata.diskaddraddr !== "")
                    {
                        disakaddrdata.diskaddrid = recordcount
                        //do insert data
                        console.log("insert==========")
                        console.log(recordcount)
                        console.log(disakaddrdata)

                        //set insertflag false
                        insertflag = false
                        recordcount = recordcount + 1

                        tempaddr = disakaddrdata.diskaddraddr
                        
                    }
                    
                    

                }
                
                
                
            }
            console.log(col_start)
            console.log(columname_data)
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

// const path = "D:/workspace/pyhon3/cipan/";
const path = "D:/workspace/nodejs/cipan/";

const file = "template1.xlsx"

// wk = convertaddr(path,file)

convertaddr1(path,file)


