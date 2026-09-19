import {db} from './db';
export class EquipmentModel{static all(){return db.prepare('SELECT * FROM equipment ORDER BY brand,model').all() as any[]}}
