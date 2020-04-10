import xlwings as xw





class xlsxcopy(object):

    def __init__(self):
        pass
    
    def xlsxprocess(self,path,localfilename,passwd,destfilename):
        app1 = xw.App(visible=False,add_book=False)
        #open old file
        wb1 = app1.books.open(path + localfilename, password = passwd)
        sht1 = wb1.sheets[0]
        print(sht1.range('a1').value)
        sht1.api.Copy(Before=sht1.api)


        #copy and save a new file
        app2 = xw.App(visible=False,add_book=False)
        wb2 = app2.books.add()
        sht2 = wb2.sheets[0]

        #copy data
        sht2.range('A1').value = sht1.range('A1').value

        
        wb2.save(path+destfilename)

        wb1.close()
        wb2.close()
        app1.quit()
        app2.quit()

    


if __name__ == "__main__":

    path = r"D:/workspace/pyhon3/cipan/"
    localfilename = "张江主机新线磁盘统计表_测试开发 (20200324).xlsx"
    passwd='111111'
    destfilename = "template.xlsx"

    xc = xlsxcopy()
    xc.xlsxprocess(path,localfilename,passwd,destfilename)
     


    
