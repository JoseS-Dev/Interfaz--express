import {Router} from 'express';
import { ColorsController } from '../Controller/Color.mjs';
import { ModelsColors } from '../Models/ColorsDB.mjs';


const router = Router();
const colorsController = new ColorsController({ ModelsColors: ModelsColors});
export const RoutesColors = router;


// GET
RoutesColors.get('/', colorsController.getAll);
RoutesColors.get('/:id_colors', colorsController.getByID);
RoutesColors.get('/primary/:primary_color', colorsController.getByPrimaryColor);
RoutesColors.get('/secondary/:secondary_color', colorsController.getBySecondaryColor);
RoutesColors.get('ternary/:ternary_color', colorsController.getByTernaryColor);
RoutesColors.get('/cuaternary/:cuaternary_color', colorsController.getByCuarternaryColor);
RoutesColors.get('/neutral/:neutral_color', colorsController.getByNeutralColor);

// POST
RoutesColors.post('/', colorsController.createColor);

// PATCH
RoutesColors.patch('/:id_colors', colorsController.updateByID);

// DELETE
RoutesColors.delete('/:id_colors', colorsController.deleteByID);