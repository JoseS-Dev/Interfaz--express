import {Router} from 'express';
import { ControllerImages } from '../Controller/Images.mjs';
import { ModelsImages } from '../Models/ImagesDB.mjs';
import { uploadImages } from '../Middlewares/ImagesUpload.mjs';
import { authMiddleware } from '../Middlewares/Auth.mjs';
const router = Router();
const controllerImages = new ControllerImages({ ModelsImages: ModelsImages });
export const RoutesImages = router;

// GET
// Obtener todas las imagenes
RoutesImages.get('/', controllerImages.getAllImages);
// Obtener una imagen por su ID
RoutesImages.get('/:id_image', controllerImages.getImageByID);
// Obtener una imagen por su formato
RoutesImages.get('/format/:format_image', controllerImages.getImageByFormat);
// Obtener una imagen por su tamaño
RoutesImages.get('/size/:size_image', controllerImages.getImageBySize);
// Obtener todas las imagenes seleccionadas
RoutesImages.get('/Selected/all', controllerImages.getAllSelected);

// POST
// Crear una nueva imagen
RoutesImages.post('/create', authMiddleware, uploadImages, controllerImages.createImage);

// PATCH
// Actualizar una imagen por su ID
RoutesImages.patch('/update/:id_image', uploadImages ,controllerImages.updateImage);
// Seleccionar una imagen por su ID
RoutesImages.patch('/select', authMiddleware, controllerImages.selectImage);

// DELETE
// Eliminar una imagen por su ID
RoutesImages.delete('/delete/:id_image', authMiddleware, controllerImages.deleteImage);