import { Router } from 'express';
import { TypographyController } from '../Controller/Typography.mjs';
import { ModelsTypography } from '../Models/TypographyDB.mjs';

const router = Router();
const typographycontroller = new TypographyController({ModelsTypography: ModelsTypography});
export const TypographyRouter = router;

/// GET
TypographyRouter.get('/', typographycontroller.getAll);
TypographyRouter.get('/:id_tipography', typographycontroller.getByID);
TypographyRouter.get('/NameMain/:name_tipography_main', typographycontroller.getByMainName);
TypographyRouter.get('/NameSeco/:name_tipography_secondary', typographycontroller.getBySecondaryName);
TypographyRouter.get('/TamFont/:tam_font', typographycontroller.getByFontSize);
TypographyRouter.get('/TamParagraph/:tam_paragraph', typographycontroller.getByFontParagraph);
TypographyRouter.get('/TamTitle/:tam_title', typographycontroller.getByFontTitle);
TypographyRouter.get('/TamSubtitle/:tam_subtitle', typographycontroller.getByFontSubtitle);
TypographyRouter.get('/ArchiveFont/:archive_font', typographycontroller.getByArchiveFont);

/// POST
TypographyRouter.post('/Main', typographycontroller.createTipographyMain);
TypographyRouter.post('/Secondary', typographycontroller.createTipographySecondary);
TypographyRouter.post('/', typographycontroller.createTipography);

/// PATCH
TypographyRouter.patch('/:id_tipography', typographycontroller.updateByID);

/// DELETE
TypographyRouter.delete('/:id_tipography', typographycontroller.deleteByID);