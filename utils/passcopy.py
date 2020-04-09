import xlrd
import win32com.client
import csv
import sys
import xlwings as xw

# xlApp = win32com.client.Dispatch("Excel.Application")
# filename,password = r"D:/workspace/pyhon3/cipan/222.xlsx", '111111'
# # xlwb = xlApp.Workbooks.Open(filename, False, True, None, Password=password)
# xlwb = xlApp.Workbooks.Open(filename)
# sht = xlwb.Worksheets(1)  
# print(sht.Cells(1, 1).Value)


# 打开文件
workbook = xlrd.open_workbook(r"D:/workspace/pyhon3/cipan/222.xlsx")

print(workbook)

sheet2 = workbook.sheet_by_index(0) # sheet索引从0开始
# sheet2 = workbook.sheet_by_name('sheet2')
 
rows = sheet2.cell_value(0,0) # 获取第四行内容
print(rows)



# app = xw.App(visible=True,add_book=False)
# wb = app.books.open(r"D:/workspace/pyhon3/cipan/222.xlsx")
