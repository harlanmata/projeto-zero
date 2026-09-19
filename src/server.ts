import express from 'express';
import path from 'node:path';
import routes from './routes';
import './models/db';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(path.join(process.cwd(), 'src', 'public')));

app.use(routes); const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Wprinter Assistente Técnico: http://localhost:${port}`));

