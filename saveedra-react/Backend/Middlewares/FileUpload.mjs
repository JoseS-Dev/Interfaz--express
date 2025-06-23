import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsDir = path.resolve('uploads/fonts');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

export const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024},
    fileFilter: (req, file, cb ) => {
        const extension = path.extname(file.originalname).toLowerCase();
        if(extension === '.ttf') cb(null, true);
        else cb(new Error("El archivo debe ser un archivo .ttf"), false);
    }
})

export const uploadFonts = upload.fields([
    { name: 'main_font', maxCount: 1 },
    { name: 'secondary_font', maxCount: 1 }
])