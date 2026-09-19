import {Request,Response} from 'express';
import {ErrorModel} from '../models/ErrorModel';
import {PartModel} from '../models/PartModel';
import {EquipmentModel} from '../models/EquipmentModel';
import {ExcelService} from '../services/ExcelService';
import path from 'node:path';
import fs from 'node:fs';

export class TechController{
 static home(req:Request,res:Response){const q=String(req.query.q||''),brand=String(req.query.brand||''),model=String(req.query.model||''); res.render('index',{errors:ErrorModel.search(q,brand,model),q,brand,model})}
 static detail(req:Request,res:Response){const e=ErrorModel.find(Number(req.params.id)); if(!e)return res.status(404).send('Erro não encontrado'); res.render('detail',{e,parts:PartModel.byError(e.brand,e.model,e.code)})}
 static admin(req:Request,res:Response){res.render('admin',{errors:ErrorModel.search(),parts:PartModel.all(),equipment:EquipmentModel.all(),msg:req.query.msg||''})}
 static saveError(req:Request,res:Response){ErrorModel.upsert(req.body);res.redirect('/admin?msg=Erro%20salvo')}
 static deleteError(req:Request,res:Response){ErrorModel.remove(Number(req.params.id));res.redirect('/admin?msg=Erro%20excluído')}
 static import(req:Request,res:Response){if(!req.file)return res.redirect('/admin?msg=Nenhum%20arquivo');const r=ExcelService.import(req.file.path);res.redirect('/admin?msg='+encodeURIComponent(`Importação concluída: ${r.errors} erros e ${r.parts} peças.`))}
 static export(req:Request,res:Response){const f=path.join(process.cwd(),'data','export_wprinter.xlsx');ExcelService.export(f);res.download(f,'Wprinter_Banco_Tecnico.xlsx',()=>{try{fs.unlinkSync(f)}catch{}})}
}
