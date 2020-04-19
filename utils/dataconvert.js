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
    for(var i=0;  i < 2; i++)
    {
        const shtname = wk.SheetNames[i]
        console.log(shtname)
        //保存数据范围数据
        const rows = [];
        const result = []
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
            
            // const row_data;
            // const j;
            // const addr;
            // const cell;
            //按行对 sheet 内的数据循环
            for(;row_start<=row_end;row_start++) {
                const row_data = [];
                //读取当前行里面各个列的数据
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
                console.log(row_start)
                console.log(row_end)
                var cellunitstart  = 1
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
                                disakaddrdata.diskaddrcu = cell.v
                            }
                            else{
                                // disakaddrdata.diskaddrcu = ""
                            }
                        }
                        else{
                            // disakaddrdata.diskaddrcu = ""
                        }
                    };
                    if(row_start == DATALINE3)
                    {
                        if(typeof(cell) !== "undefined")
                        {
                            if(cell.v !== "")
                            {
                                disakaddrdata.diskaddruse = cell.v
                            }
                            else{
                                // disakaddrdata.diskaddruse = ""
                            }
                        }
                        else{
                            // disakaddrdata.diskaddruse = ""
                        }
                    };
                    if(row_start = DATALINE4)
                    {
                        if(typeof(cell) !== "undefined")
                        {
                            
                        }
                    }
                    if(row_start > DATALINE4)
                    {
                        
                        if(typeof(cell) !== "undefined")
                        {
                            console.log("xxxxxxxxx1")
                            console.log(cell.v)
                            row_data.push(cell.v);
                            disakaddrdata.diskaddrid = recordcount

                            if (cellunitstart <=5)
                            {
                                if(cellunitstart == 1)
                                {
                                    disakaddrdata.diskaddraddr = cell.v
                                }
                                if(cellunitstart == 2)
                                {
                                    disakaddrdata.diskaddrlabel = cell.v
                                }
                                if(cellunitstart == 3)
                                {
                                    disakaddrdata.diskaddrtype = cell.v
                                }
                                if(cellunitstart == 4)
                                {
                                    disakaddrdata.diskaddrsg = cell.v
                                }
                                if(cellunitstart == 5)
                                {
                                    disakaddrdata.diskaddrplex = cell.v
                                    
                                }

                            }

                            
                        }
                        else{
                            console.log("xxxxxxxxx2")
                            console.log(row_start)
                            console.log(j)
                            row_data.push("");

                            if (cellunitstart <=5)
                            {
                                if(cellunitstart == 1)
                                {
                                    disakaddrdata.diskaddraddr = ""
                                }
                                if(cellunitstart == 2)
                                {
                                    disakaddrdata.diskaddrlabel = ""
                                }
                                if(cellunitstart == 3)
                                {
                                    disakaddrdata.diskaddrtype = ""
                                }
                                if(cellunitstart == 4)
                                {
                                    disakaddrdata.diskaddrsg = ""
                                }
                                if(cellunitstart == 5)
                                {
                                    disakaddrdata.diskaddrplex = ""
                                    
                                }

                            }
                        }
                        cellunitstart = cellunitstart + 1
                        if(cellunitstart > 5)
                        {
                            cellunitstart = 1
                            recordcount = recordcount + 1
                            console.log(disakaddrdata)

                            console.log(cellunitstart)
                        }
                        
                    }
                    

                    //insert data

                }
                rows.push(row_data);
            }
            console.log(col_start)
        } 
        
        //保存当前页内的数据
        result[shtname] = rows;
        
        // console.log(result)
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


