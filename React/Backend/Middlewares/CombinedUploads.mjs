import multer from 'multer';
import path from 'path';

// Reutiliza la configuración de almacenamiento o define una genérica
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Decide la carpeta de destino según el nombre del campo
        let dest = 'uploads/';
        if (file.fieldname.startsWith('url_video')) dest += 'videos';
        else if (file.fieldname.startsWith('url_audio')) dest += 'audios';
        else if (file.fieldname.startsWith('subtitle')) dest += 'subtitles';
        console.log(file)
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploadsCombined = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Usa el límite más grande
});

// Middleware que acepta TODOS los campos posibles
export const uploadForUpdate = uploadsCombined.fields([
    { name: 'url_video', maxCount: 1 },
    { name: 'url_audio_main', maxCount: 1 },
    { name: 'url_audio_secondary', maxCount: 1 },
    { name: 'subtitle_main_video', maxCount: 1 },
    { name: 'subtitle_secondary_video', maxCount: 1 }
]);