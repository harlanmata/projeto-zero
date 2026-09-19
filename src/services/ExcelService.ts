import XLSX from 'xlsx';
import fs from 'node:fs';
import {db} from '../models/db';
import {ErrorModel} from '../models/ErrorModel';
import {PartModel} from '../models/PartModel';

const val=(r:any,k:string)=>String(r[k]??'').trim();
export class ExcelService{
 static import(file:string){
  const wb=XLSX.readFile(file); const result={errors:0,parts:0,equipment:0};
  const errors=XLSX.utils.sheet_to_json<any>(wb.Sheets[wb.SheetNames.find(n=>/BASE_ERROS|ERROS/i.test(n))||wb.SheetNames[0]]);
  const tx=db.transaction(()=>{for(const r of errors){const brand=val(r,'Marca'),model=val(r,'Modelo'),code=val(r,'Código de erro'); if(brand&&model&&code){ErrorModel.upsert({brand,model,code,description:val(r,'Descrição'),cause:val(r,'Causa provável'),procedure:val(r,'Procedimento de diagnóstico'),observations:val(r,'Observações')});result.errors++}}}); tx();
  const ps=wb.Sheets[wb.SheetNames.find(n=>/BASE_PECAS|PEÇAS/i.test(n))||'']; if(ps){for(const r of XLSX.utils.sheet_to_json<any>(ps)){if(val(r,'Part Number')||val(r,'Peça')){PartModel.upsert({brand:val(r,'Marca'),model:val(r,'Modelo'),part_number:val(r,'Part Number'),part_name:val(r,'Peça'),category:val(r,'Categoria'),related_code:val(r,'Código de erro relacionado'),observations:val(r,'Observações')});result.parts++}}}
  fs.unlinkSync(file); return result;
 }
 static export(file:string){const wb=XLSX.utils.book_new(); for(const [name,rows] of [['Erros',db.prepare('SELECT brand as Marca,model as Modelo,code as "Código de erro",description as Descrição,cause as "Causa provável",procedure as "Procedimento de diagnóstico",observations as Observações FROM errors').all()],['Peças',db.prepare('SELECT brand as Marca,model as Modelo,part_number as "Part Number",part_name as Peça,category as Categoria,related_code as "Código de erro relacionado",observations as Observações FROM parts').all()],['Equipamentos',db.prepare('SELECT brand as Marca,model as Modelo,technology as Tecnologia,format as Formato,observations as Observações FROM equipment').all()]] as any[]){XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(rows),name)} XLSX.writeFile(wb,file)}
}
