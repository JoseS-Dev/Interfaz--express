import {Router} from 'express';
import { ControllerVideos } from '../Controller/Videos.mjs';
import { ModelsVideos } from '../Models/VideosDB.mjs';
import { uploadVideos } from '../Middlewares/VideosUploads.mjs';
import { authMiddleware } from '../Middlewares/Auth.mjs';
import { uploadAudios } from '../Middlewares/AudiosUploads.mjs';
import { uploadSubtitles } from '../Middlewares/SubtitlesUploads.mjs';

const router = Router();
const controllervideo = new ControllerVideos({ ModelsVideos: ModelsVideos});
export const RoutesVideos = router;

// GET
// Obtener todos los videos
RoutesVideos.get('/', controllervideo.getAllVideos);
// Obtener un video por su ID
RoutesVideos.get('/:id_video', controllervideo.getVideosByID);
// Obtener un video por su formato
RoutesVideos.get('/format/:format_video', controllervideo.getVideosByFormat);
// Obtener un video por su tamaño
RoutesVideos.get('/size/:size_video', controllervideo.getVideoBySize);

// POST
// Crear un nuevo video
RoutesVideos.post('/create', authMiddleware , uploadVideos , controllervideo.createVideo);
// Crear las pistas pra un video
RoutesVideos.post('/create/track/:id_video', uploadAudios, controllervideo.createAudio);
// Crear los subtitulos para un video
RoutesVideos.post('/create/subtitles/:id_video', uploadSubtitles, controllervideo.createSubtitle)