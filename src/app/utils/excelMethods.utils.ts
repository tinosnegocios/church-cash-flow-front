import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})

export class ExcelMethods {

  constructor() {
  }

  public readExcel(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("Arquivo inválido");
        return;
      }

      const extensoes = ['csv', 'xls', 'xlsx'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!fileExtension || !extensoes.includes(fileExtension)) {
        reject("Arquivo inválido");
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        resolve(jsonData);
      };

      fileReader.onerror = (e) => {
        reject("Erro ao ler o arquivo");
      };

      fileReader.readAsArrayBuffer(file);
    });
  }

  public exportExcel(object: any, fileNameWithoutExtension: string) {
    //code from https://medium.com/@patade888/exporting-data-to-excel-in-angular-8-5a7cf5d0d25d

    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(object);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, `${fileNameWithoutExtension}.xlsx`);
  }

}