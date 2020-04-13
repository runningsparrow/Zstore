const xlsx = require('xlsx')


convertaddr1 = function(path,file){

    const wk = xlsx.readFile(path+file);
    // const first_sheet_name = wk.SheetNames[0]; // 获取工作簿中的工作表名字 
    // const sheetnum = wk.SheetNames.length;
    // console.log(sheetnum)
    // const sht = wk.Sheets[first_sheet_name]
    // console.log(sht)

    // for(var i=0;  i < wk.SheetNames.length; i++)
    for(var i=0;  i < 1; i++)
    {
        const shtname = wk.SheetNames[i]
        console.log(shtname)
        const sht = wk.Sheets[shtname]
        //得到当前页内数据范围
        const range = xlsx.utils.decode_range(sht['!ref'])
        //保存数据范围数据
        var row_start = range.s.r;
        var row_end = range.e.r;
        const col_start = range.s.c;
        const col_end = range.e.c;
        const rows = [];
        const result = []
        // const row_data;
        // const j;
        // const addr;
        // const cell;
        //按行对 sheet 内的数据循环
        for(;row_start<=row_end;row_start++) {
            const row_data = [];
            //读取当前行里面各个列的数据
            console.log(row_start)
            console.log(row_end)
            for(j=col_start;j<=col_end;j++) {
                const addr = xlsx.utils.encode_col(j) + xlsx.utils.encode_row(row_start);
                console.log(addr)
                const cell = sht[addr];
                console.log("============")
                console.log(cell)
                console.log(typeof(cell))
                if(typeof(cell) !== "undefined")
                {
                    console.log(cell.v)
                    row_data.push(cell.v);
                }
                else{
                    console.log(row_start)
                    console.log(j)
                    row_data.push("");
                }
                // console.log(cell)
                //如果是链接，保存为对象，其它格式直接保存原始值
                // if(cell.l) {
                //     row_data.push({text: cell.v, link: cell.l.Target});
                // } else {
                //     row_data.push(cell.v);
                // }
                // row_data.push(cell);
            }
            rows.push(row_data);
        }
        //保存当前页内的数据
        result[shtname] = rows;
        console.log(result)
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

const path = "D:/workspace/pyhon3/cipan/";

const file = "template1.xlsx"

// wk = convertaddr(path,file)

convertaddr1(path,file)


