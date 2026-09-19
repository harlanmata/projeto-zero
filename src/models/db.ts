import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const dataDir=path.resolve(process.env.DATA_DIR || path.join(process.cwd(),'data'));
fs.mkdirSync(dataDir,{recursive:true});
export const db=new Database(path.join(dataDir,'wprinter_tecnico.db'));
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS errors(id INTEGER PRIMARY KEY AUTOINCREMENT,brand TEXT NOT NULL,model TEXT NOT NULL,code TEXT NOT NULL,description TEXT DEFAULT '',cause TEXT DEFAULT '',procedure TEXT DEFAULT '',observations TEXT DEFAULT '',UNIQUE(brand,model,code));
CREATE TABLE IF NOT EXISTS parts(id INTEGER PRIMARY KEY AUTOINCREMENT,brand TEXT,model TEXT,part_number TEXT,part_name TEXT,category TEXT,related_code TEXT,observations TEXT);
CREATE TABLE IF NOT EXISTS equipment(id INTEGER PRIMARY KEY AUTOINCREMENT,brand TEXT,model TEXT,technology TEXT,format TEXT,observations TEXT,UNIQUE(brand,model));
`);
