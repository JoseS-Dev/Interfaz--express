import {Router} from 'express';
import { ColorsController } from '../Controller/Color.mjs';
import { ModelsColors } from '../Models/ColorsDB.mjs';


const router = Router();
const colorsController = new ColorsController({ ModelsColors: ModelsColors});
export const RoutesColors = router;


// GET
RoutesColors.get('/', colorsController.getAll);
RoutesColors.get('/:id_colors', colorsController.getByID);
RoutesColors.get('/Primary/:primary_color', colorsController.getByPrimaryColor);
RoutesColors.get('/Secondary/:secondary_color', colorsController.getBySecondaryColor);
RoutesColors.get('/Ternary/:ternary_color', colorsController.getByTernaryColor);
RoutesColors.get('/Cuaternary/:cuaternary_color', colorsController.getByCuarternaryColor);
RoutesColors.get('/Neutral/:neutral_color', colorsController.getByNeutralColor);

// POST
RoutesColors.post('/:id_user', colorsController.createColor);

// PATCH
RoutesColors.patch('/:id_colors', colorsController.updateByID);

// DELETE
RoutesColors.delete('/:id_colors', colorsController.deleteByID);