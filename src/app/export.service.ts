import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  public async exportAsExcelFile(json: any[], excelFileName: string, header: any[]) {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet(excelFileName);

    sheet.columns = header;

    for (let i = 0; i < json.length; i++) {
      const jsonRow = json[i];
      sheet.addRow(jsonRow);
    }

    sheet.eachRow(function (row:any, rowNumber:any) {

      row.eachCell((cell:any, colNumber:any) => {
        if (rowNumber === 1) {
          // First set the background of header row
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'dfe9f5' },
          };
        } else {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'f2f6fb' },
          };
        }
        // Set border of each cell

        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
      // Commit the changed row to the stream

      row.commit();
    });

    const buffer = await workbook.xlsx.writeBuffer();
    this.saveAsExcelFile(buffer, excelFileName);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

}
