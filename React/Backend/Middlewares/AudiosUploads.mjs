import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Crear la carpeta para subir los audios
const uploadsDirAudios = path.resolve('uploads/audios');

if(!fs.existsSync(uploadsDirAudios)){
    fs.mkdirSync(uploadsDirAudios, { recursive: true })
}

// Configuración del alamacenamiento de multer para los audios
const storageAudio = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDirAudios);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// Configuración del multer para los audios
const uploadsAudio = multer({
    storage: storageAudio,
    limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50 MB
    filefilter: (req, res, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if(['.mp3', '.wav', 'm4a', 'webm'].includes(ext)){
            return cb(null, true);
        }
        else{
            return cb(new Error('Solo se permiten archivos de audio .mp3, .wav, .m4a, .webm'));
        }
    }
})

// Exportar el middleware de multer para los audios
export const uploadAudios = uploadsAudio.fields([
    { name: 'url_audio_main', maxCount: 1 },
    { name: 'url_audio_secondary', maxCount: 1 }
]);