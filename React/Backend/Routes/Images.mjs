import {Router} from 'express';
import { ControllerImages } from '../Controller/Images.mjs';
import { ModelsImages } from '../Models/ImagesDB.mjs';

const router = Router();
const controllerImages = new ControllerImages({ ModelsImages: ModelsImages });
export const RoutesImages = router;