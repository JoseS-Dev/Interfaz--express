import { Router } from 'express';
import { TypographyController } from '../Controller/Typography.mjs';
import { ModelsTypography } from '../Models/TypographyDB.mjs';
import { upload, uploadFonts } from '../Middlewares/FileUpload.mjs';
import { authMiddleware } from '../Middlewares/Auth.mjs';

const router = Router();
const typographycontroller = new TypographyController({ModelsTypography: ModelsTypography});
export const RoutesTipography = router;

/// GET
RoutesTipography.get('/', authMiddleware, typographycontroller.getAll);
RoutesTipography.get('/selected', authMiddleware, typographycontroller.getSelectedTypography);
RoutesTipography.get('/:id_tipography', typographycontroller.getByID);
RoutesTipography.get('/NameMain/:name_tipography_main', typographycontroller.getByMainName);
RoutesTipography.get('/NameSeco/:name_tipography_secondary', typographycontroller.getBySecondaryName);
RoutesTipography.get('/TamFont/:tam_font', typographycontroller.getByFontSize);
RoutesTipography.get('/TamParagraph/:tam_paragraph', typographycontroller.getByFontParagraph);
RoutesTipography.get('/TamTitle/:tam_title', typographycontroller.getByFontTitle);
RoutesTipography.get('/TamSubtitle/:tam_subtitle', typographycontroller.getByFontSubTitle);
RoutesTipography.get('/ArchiveFont/:archive_font', typographycontroller.getByArchiveFont);

/// POST
RoutesTipography.post('/Main/:id_user',upload.single('archive_font'), typographycontroller.createTipographyMain);
RoutesTipography.post('/Secondary/:id_user',upload.single('archive_font'), typographycontroller.createTipographySecondary);
RoutesTipography.post('/', authMiddleware, uploadFonts, typographycontroller.createTipography);

/// PATCH
RoutesTipography.patch('/select', authMiddleware, typographycontroller.selectTypography);
RoutesTipography.patch('/:id_tipography', typographycontroller.updateByID);

/// DELETE
RoutesTipography.delete('/:id_tipography', typographycontroller.deleteByID);