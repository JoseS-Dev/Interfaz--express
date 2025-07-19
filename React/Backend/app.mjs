import express, {json} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { RoutesUsers } from './Routes/User.mjs';
import { RoutesColors } from './Routes/Color.mjs';
import { RoutesTipography } from './Routes/Typography.mjs';
import { RoutesImages } from './Routes/Images.mjs';
import { RoutesVideos } from './Routes/Videos.mjs';

dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(json());
app.use(cookieParser());

app.use('/font',express.static('uploads/fonts'));
app.use('/imagen', express.static('uploads/images'));
app.use('/video', express.static('uploads/videos'));
app.use('/audio', express.static('uploads/audios'));
app.use('/subtitle', express.static('uploads/subtitles'));


app.use('/Users', RoutesUsers);
app.use('/Colors', RoutesColors);
app.use('/Tipography', RoutesTipography);
app.use('/Images', RoutesImages);
app.use('/Videos', RoutesVideos);


app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
})

