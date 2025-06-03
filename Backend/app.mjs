import express, {json} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { RoutesUsers } from './Routes/User.mjs';
import { RoutesColors } from './Routes/Color.mjs';
import { RoutesTipography } from './Routes/Typography.mjs';
import path from 'path';

dotenv.config();

const app = express();
// Servir archivos estáticos desde la carpeta "uploads/fonts"
app.use('/fonts', express.static(path.resolve('uploads/fonts')));
app.use(cors());
app.use(json());
app.use(cookieParser());
app.use('/font',express.static('uploads/fonts'));


app.use('/Users', RoutesUsers);
app.use('/Colors', RoutesColors);
app.use('/Tipography', RoutesTipography);


app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
})

