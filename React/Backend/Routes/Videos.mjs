import {Router} from 'express';
import { ControllerVideos } from '../Controller/Videos.mjs';
import { ModelsVideos } from '../Models/VideosDB.mjs';

const router = Router();
const controllervideo = new ControllerVideos({ ModelsVideos: ModelsVideos});
export const RoutesVideos = router;