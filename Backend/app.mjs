import express, {json} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { RoutesUsers } from './Routes/User.mjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(cookieParser());



app.use('/Users', RoutesUsers)


app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
})

