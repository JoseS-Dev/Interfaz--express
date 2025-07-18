import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Crear la carpeta para subir los videos
const uploadsDirVideos = path.resolve('uploads/videos');
const uploadsDirSubtitles = path.resolve('uploads/subtitles');
const uploadsDirAudios = path.resolve('uploads/audios');

if(!fs.existsSync(uploadsDirVideos)){
    fs.mkdirSync(uploadsDirVideos, { recursive: true })
}
if(!fs.existsSync(uploadsDirSubtitles)){
    fs.mkdirSync(uploadsDirSubtitles, { recursive: true })
}
if(!fs.existsSync(uploadsDirAudios)){
    fs.mkdirSync(uploadsDirAudios, { recursive: true })
}

// Configuración del almacenamiento de multer para los videos
const storageVideo = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDirVideos);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// Configuración del almacenamiento de multer para los subtítulos
const storageSubtitle = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDirSubtitles);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// Configuración del almacenamiento de multer para los audios
const storageAudio = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDirAudios);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Configuración del multer para los videos
const uploadsVideo = multer({
    storage: storageVideo,
    limits: { fileSize: 100 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if(ext !== '.mp4' && ext !== '.avi' && ext !== '.mkv') {
            return cb(new Error('Solo se permiten archivos de video .mp4, .avi, .mkv'));
        }
        cb(null, true);
    }
})

// Configuración del multer para los subitulos
const uploadsSubtitles = multer({
    storage: storageSubtitle,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if(ext !== '.srt' && ext !== '.vtt') {
            return cb(new Error('Solo se permiten archivos de subtítulos .srt, .vtt'));
        }
        cb(null, true);
    }
})

// Configuración del multer para los audios
const uploadsAudios = multer({
    storage: storageAudio,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if(ext !== '.mp3' && ext !== '.wav') {
            return cb(new Error('Solo se permiten archivos de audio .mp3, .wav'));
        }
        cb(null, true);
    }
})

// Middlware para subir videos, con subtítulos y audios
export const uploadsVideos = (req, res, next) => {
    const uploads = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                if(file.fieldname === 'url_video'){
                    cb(null, uploadsDirVideos);
                }
                else if(file.fieldname === 'subtitle_main_video' || file.fieldname === 'subtitle_secondary_video'){
                    cb(null, uploadsDirSubtitles);
                } else if(file.fieldname === 'audio_track_main_video' || file.fieldname === 'audio_track_secondary_video'){
                    cb(null, uploadsDirAudios);
                } else {
                    cb(new Error('Tipo de archivo no permitido'));
                }
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        }),
        limits: {
            fileSize: (file) => {
                if(file.fieldname === 'url_video'){
                    return 100 * 1024 * 1024;
                }
                else if(file.fieldname === 'subtitle_main_video' || file.fieldname === 'subtitle_secondary_video'){
                    return 10 * 1024 * 1024;
                } else if(file.fieldname === 'audio_track_main_video' || file.fieldname === 'audio_track_secondary_video'){
                    return 50 * 1024 * 1024;
                }
            }
        },
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            if(file.fieldname === 'url_video'){
                if(['.mp4', '.avi', '.mkv'].includes(ext)){
                    return cb(null, true);
                }
                else{
                    return cb(new Error('Solo se permiten archivos de video .mp4, .avi, .mkv'));
                }
            }
            else if(file.fieldname === 'subtitle_main_video' || file.fieldname === 'subtitle_secondary_video'){
                if(['.srt', '.vtt'].includes(ext)){
                    return cb(null, true);
                }
                else{
                    return cb(new Error('Solo se permiten archivos de subtítulos .srt, .vtt'));
                }
            } else if(file.fieldname === 'audio_track_main_video' || file.fieldname === 'audio_track_secondary_video'){
                if(['.mp3', '.wav'].includes(ext)){
                    return cb(null, true);
                }
                else{
                    return cb(new Error('Solo se permiten archivos de audio .mp3, .wav'));
                }
            } else {
                return cb(new Error('Tipo de archivo no permitido'));
            }
        }
    }).fields([
        { name: 'url_video', maxCount: 1 },
        { name: 'subtitle_main_video', maxCount: 1 },
        { name: 'subtitle_secondary_video', maxCount: 1 },
        { name: 'audio_track_main_video', maxCount: 1 },
        { name: 'audio_track_secondary_video', maxCount: 1 }
    ]);

    // Ejecutar el middleware de multer
    uploads(req, res, (err) => {
        if(err){
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}
