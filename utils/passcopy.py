import xlwings as xw



class xlsxcopy(object):

    def __init__(self):
        pass
    
    def xlsxprocess(self,path,localfilename,passwd,destfilename):
        app1 = xw.App(visible=False,add_book=False)
        #open old file
        wb1 = app1.books.open(path + localfilename, password = passwd)
        # sht1 = wb1.sheets[0]
        print(len(wb1.sheets))

        app2 = xw.App(visible=False,add_book=False)
        wb2 = app2.books.add()

        for i in range(0,len(wb1.sheets)):
            print("xxx")
            print(i)
            print(wb1.sheets[3].name)
            print(wb1.sheets[i].name)
            sht1 = wb1.sheets[i]
            print(sht1.range('A1').value)
            print(sht1["A1048576"].end('up').row) #最大行，根据单元格位置
            #设定从列数最大的行取值
            print(sht1["XFD18"].end('left').column) #最大列,根据单元格位置
            
            print(self.colnum_to_name(sht1["XFD18"].end('left').column - 1))
            
            maxcolumn = self.colnum_to_name(sht1["XFD18"].end('left').column - 1) + str(sht1["A1048576"].end('up').row)
            print(maxcolumn)

            # sht1.api.Copy(Before=sht1.api)


            #copy and save a new file
            if i == 0:
                wb2.sheets[i].name = wb1.sheets[i].name
                sht2 = wb2.sheets[i]

            else: 
                sht2 = wb2.sheets.add(wb1.sheets[i].name)

            #copy data
            sht2.range('A1',maxcolumn).value = sht1.range('A1',maxcolumn).value
            # sht2.range('A1',maxcolumn).raw_value = sht1.range('A1',maxcolumn).raw_value
            
        

        
        wb2.save(path+destfilename)

        wb1.close()
        wb2.close()
        app1.quit()
        app2.quit()
        print("处理结束！")

    
    def colname_to_num(self,colname):
        if type(colname) is not str:
            return colname
        col = 0
        power  = 1
    #     print len(colname)
        for i in range(len(colname) - 1, -1, -1):
            ch = colname[i]
    #         print ch
            col += (ord(ch) - ord('A') +  1 ) * power
            power *= 26
    #     print col-1
        return col - 1
 
    def colnum_to_name(self,colnum):
        if type(colnum) != int:
            return colnum
        if colnum > 25:
            ch1 = chr(int(colnum % 26 + 65))
            ch2 = chr(int(colnum / 26 + 64))
    #         print ch2+ch1
            return ch2 + ch1
        else:
    #         print chr(colnum % 26 + 65)
            return chr(int(colnum % 26 + 65))


if __name__ == "__main__":

    path = r"D:/workspace/pyhon3/cipan/"
    localfilename = "张江主机新线磁盘统计表_测试开发 (20200324).xlsx"
    passwd='111111'
    destfilename = "template1.xlsx"

    xc = xlsxcopy()
    xc.xlsxprocess(path,localfilename,passwd,destfilename)
     


    
