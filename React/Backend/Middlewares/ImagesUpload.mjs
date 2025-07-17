import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Creamos las carpeta para guardar las imagenes
const uploadsDir = path.resolve('uploads/images');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración del alamacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// Configuración de multer
const uploads = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        if(extension === '.jpg' || extension === '.jpeg' || extension === '.png' || extension === '.gif'){
            cb(null, true);
        }
        else{
            cb(new Error("El archivo debe ser una imagen .jpg, .jpeg o .png"), false);
        }
    }

})

export const uploadImages = uploads.single('Image');