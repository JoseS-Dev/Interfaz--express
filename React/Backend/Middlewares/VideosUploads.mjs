import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Crear la carpeta para subir los videos
const uploadsDir = path.resolve('uploads/videos');

if(!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true })
}


// Configuración del almacenamiento de multer para los videos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// Configuración del multer para los videos
const uploads = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Limite de 100 MB
    fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        if(extension === '.mp4' || extension === '.avi' || extension === '.mov' || extension === '.mkv'){
            cb(null, true);
        }
        else{
            cb(new Error("El archivo debe ser un video .mp4, .avi, .mov o .mkv"), false);
        }
    }
})

// Exportar el middleware de multer para los videos
export const uploadVideos = uploads.single('url_video');


