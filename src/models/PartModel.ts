import {db} from './db';
export type PartRow={id?:number,brand?:string,model?:string,part_number?:string,part_name?:string,category?:string,related_code?:string,observations?:string};
export class PartModel{
 static all(){return db.prepare('SELECT * FROM parts ORDER BY brand,model,part_name').all() as PartRow[]}
 static byError(brand:string,model:string,code:string){return db.prepare(`SELECT * FROM parts WHERE (brand='' OR brand=? ) AND (model='' OR model=? ) AND (related_code='' OR related_code=?)`).all(brand,model,code) as PartRow[]}
 static upsert(r:PartRow){db.prepare(`INSERT INTO parts(brand,model,part_number,part_name,category,related_code,observations) VALUES(@brand,@model,@part_number,@part_name,@category,@related_code,@observations)`).run({...r})}
}
