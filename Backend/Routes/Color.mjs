import {Router} from 'express';
import { ColorsController } from '../Controller/Color.mjs';
import { ModelsColors } from '../Models/ColorsDB.mjs';


const router = Router();
const colorsController = new ColorsController({ ModelsColors: ModelsColors});
export const colorsRouter = router;


// GET
colorsRouter.get('/', colorsController.getAll);
colorsRouter.get('/:id_colors', colorsController.getByID);
colorsRouter.get('/primary/:primary_color', colorsController.getByPrimaryColor);
colorsRouter.get('/secondary/:secondary_color', colorsController.getBySecondaryColor);
colorsRouter.get('ternary/:ternary_color', colorsController.getByTernaryColor);
colorsRouter.get('/cuaternary/:cuaternary_color', colorsController.getByCuarternaryColor);
colorsRouter.get('/neutral/:neutral_color', colorsController.getByNeutralColor);

// POST
colorsRouter.post('/', colorsController.createColor);

// PATCH
colorsRouter.patch('/:id_colors', colorsController.updateByID);

// DELETE
colorsRouter.delete('/:id_colors', colorsController.deleteByID);