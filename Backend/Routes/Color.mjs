import {Router} from 'express';
import { ColorsController } from '../Controller/Color.mjs';
import { ModelsColors } from '../Models/ColorsDB.mjs';
import { authMiddleware } from '../Middlewares/Auth.mjs'


const router = Router();
const colorsController = new ColorsController({ ModelsColors: ModelsColors});
export const RoutesColors = router;


// GET
RoutesColors.get('/', authMiddleware ,colorsController.getAll);
RoutesColors.get('/selected', authMiddleware, colorsController.getSelectedColors)
RoutesColors.get('/:id_colors', colorsController.getByID);
RoutesColors.get('/Primary/:primary_color', colorsController.getByPrimaryColor);
RoutesColors.get('/Secondary/:secondary_color', colorsController.getBySecondaryColor);
RoutesColors.get('/Ternary/:ternary_color', colorsController.getByTernaryColor);
RoutesColors.get('/Cuaternary/:cuaternary_color', colorsController.getByCuarternaryColor);
RoutesColors.get('/Neutral/:neutral_color', colorsController.getByNeutralColor);

// POST
RoutesColors.post('/', authMiddleware, colorsController.createColor);

// PATCH
RoutesColors.patch('/select', authMiddleware, colorsController.selectColor);
RoutesColors.patch('/:id_colors', authMiddleware, colorsController.updateByID);

// DELETE
RoutesColors.delete('/:id_colors', authMiddleware, colorsController.deleteByID);