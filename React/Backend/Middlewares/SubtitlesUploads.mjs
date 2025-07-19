import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Crear la carpeta para subir los audios
const uploadsDirSubtitles = path.resolve('uploads/subtitles');
if(!fs.existsSync(uploadsDirSubtitles)){
    fs.mkdirSync(uploadsDirSubtitles, { recursive: true })
}

// Configuración del alamacenamiento de multer para los subtitulos
const storageSubtitle = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDirSubtitles);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// Configuración del multer para los subtitulos
const uploadsSubtitles = multer({
    storage: storageSubtitle,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10 MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if(['.srt', '.vtt'].includes(ext)){
            return cb(null, true);
        }
        else{
            return cb(new Error('Solo se permiten archivos de subtítulos .srt, .vtt'));
        }
    }
})

// Exportar el middleware de multer para los subtitulos
export const uploadSubtitles = uploadsSubtitles.fields([
    { name: 'subtitle_main_video', maxCount: 1 },
    { name: 'subtitle_secondary_video', maxCount: 1 }
])