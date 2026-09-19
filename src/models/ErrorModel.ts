import {db} from './db';
export type ErrorRow={id?:number,brand:string,model:string,code:string,description?:string,cause?:string,procedure?:string,observations?:string};
export class ErrorModel{
 static search(q:string='',brand='',model=''){return db.prepare(`SELECT * FROM errors WHERE (?='' OR brand LIKE '%'||?||'%') AND (?='' OR model LIKE '%'||?||'%') AND (?='' OR code LIKE '%'||?||'%' OR description LIKE '%'||?||'%') ORDER BY brand,model,code`).all(brand,brand,model,model,q,q,q) as ErrorRow[]}
 static find(id:number){return db.prepare('SELECT * FROM errors WHERE id=?').get(id) as ErrorRow|undefined}
 static upsert(r:ErrorRow){db.prepare(`INSERT INTO errors(brand,model,code,description,cause,procedure,observations) VALUES(@brand,@model,@code,@description,@cause,@procedure,@observations) ON CONFLICT(brand,model,code) DO UPDATE SET description=excluded.description,cause=excluded.cause,procedure=excluded.procedure,observations=excluded.observations`).run({...r,description:r.description||'',cause:r.cause||'',procedure:r.procedure||'',observations:r.observations||''})}
 static remove(id:number){db.prepare('DELETE FROM errors WHERE id=?').run(id)}
}
