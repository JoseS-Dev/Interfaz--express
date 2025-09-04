import { validateTipography, validateTipographyMain, validateTipographySecondary,validateTipographyUpdate } from "../Validations/SchemaTipography.mjs";

export class TypographyController {
    constructor({ModelsTypography}){
        this.ModelsTypography = ModelsTypography;
    }

    // Obtener todas las tipografias
    getAll = async ( req, res ) => {
        try{
            const typegraphies = await this.ModelsTypography.getAll();
            return res.status(200).json({
                message: 'Tipografías obtenidas correctamente',
                data: typegraphies
            });
        }
        catch(error){
            console.error('Error al obtener las tipografías:', error);
            return res.status(500).json({ error: 'Error al obtener las tipografías' });
        }
    }
    
    // Obtener una tipografia por su ID
    getByID = async ( req, res ) => {
        try{
            const { id_tipography } = req.params;
            if(id_tipography){
                const typegraphID = await this.ModelsTypography.getByID({id_tipography});
                return res.status(200).json({
                    message: 'ID encontrado correctamente',
                    data: typegraphID
                });
            }
            else{
                return res.status(400).json({ error: 'ID de tipografía no proporcionado' });
            }
        }
        catch(error){
            console.error('Error al obtener la tipografía por ID:', error);
            return res.status(500).json({ error: 'Error al obtener la tipografía por ID' });
        }
    }
    
    // Obtener una tipografia por su tipografía principal
    getByMainName = async ( req , res ) => {
        try{
            const { name_tipography_main } = req.params;
            if(name_tipography_main){
                const typegraphMain = await this.ModelsTypography.getByMainName({name_tipography_main});
                return res.status(200).json({
                    message: 'Tipografía principal encontrada correctamente',
                    data: typegraphMain
                });
            }
            else{
                return res.status(400).json({ error: 'Nombre de tipografía principal no proporcionado' });
            }
        }
        catch(error){
            console.error('Error al obtener la tipografía principal por nombre:', error);
            return res.status(500).json({ error: 'Error al obtener la tipografía principal por nombre' });
        }
    }
    
    // Obtener una tipografia por su tipografia secundaria
    getBySecondaryName = async ( req, res ) => {
        try{
            const { name_tipography_secondary } = req.params;
            if(name_tipography_secondary){
                const typegraphSecondary = await this.ModelsTypography.getBySecondaryName({name_tipography_secondary});
                return res.status(200).json({
                    message: 'Tipografía secundaria encontrada correctamente',
                    data: typegraphSecondary
                });
            }
            else{
                return res.status(400).json({ error: 'Nombre de tipografía secundaria no proporcionado' });
            }
        }
        catch(err){
            console.error('Error al obtener la tipografía secundaria por nombre:', err);
            return res.status(500).json({ error: 'Error al obtener la tipografía secundaria por nombre' });
        }
    }
    
    
    // Obtener una tipografia por su tamaño en los parrafos
    getByFontParagraph = async ( req, res ) => {
        try{
            const { tam_paragraph } = req.params;
            if(tam_paragraph){
                const typegraphParagraph = await this.ModelsTypography.getByFontParagraph({tam_paragraph});
                return res.status(200).json({
                    message: 'Tipografía por tamaño de párrafo obtenida correctamente',
                    data: typegraphParagraph
                });
            }
            else{
                return res.status(400).json({ error: 'Tamaño de párrafo no proporcionado' });
            }
        }
        catch(error){
            console.error('Error al obtener la tipografía por tamaño de párrafo:', error);
            return res.status(500).json({ error: 'Error al obtener la tipografía por tamaño de párrafo' });
        }
    }
    
    // Obtener una tipografia por su tamaño en los titulos
    getByFontTitle = async ( req, res ) => {
        try{
            const { tam_title } = req.params;
            if(tam_title){
                const typegraphTitle = await this.ModelsTypography.getByFontTitle({tam_title});
                return res.status(200).json({
                    message: 'Tipografía por tamaño de título obtenida correctamente',
                    data: typegraphTitle
                });
            }
            else{
                return res.status(400).json({ error: 'Tamaño de título no proporcionado' });
            }
        }
        catch(error){
            console.error('Error al obtener la tipografía por tamaño de título:', error);
            return res.status(500).json({ error: 'Error al obtener la tipografía por tamaño de título' });
        }
    }
    
    // Obtener una tipografia por su tamaño en los subtitulos
    getByFontSubTitle = async ( req, res ) => {
        try{
            const { tam_subtitle } = req.params;
            if(tam_subtitle){
                const typegraphSubTitle = await this.ModelsTypography.getByFontSubTitle({tam_subtitle});
                return res.status(200).json({
                    message: 'Tipografía por tamaño de subtítulo obtenida correctamente',
                    data: typegraphSubTitle
                });
            }
            else{
                return res.status(400).json({ error: 'Tamaño de subtítulo no proporcionado' });
            }
        }
        catch(error){
            console.error('Error al obtener la tipografía por tamaño de subtítulo:', err);
            return res.status(500).json({ error: 'Error al obtener la tipografía por tamaño de subtítulo' });
        }
    }
    
    // Obtener una tipografia por su archivo de fuente
    getByArchiveFont = async ( req, res ) =>{
        try{
            const { archive_font } = req.params;
            if(archive_font){
                const typegraphArchiveFont = await this.ModelsTypography.getByArchiveFont({archive_font});
                return res.status(200).json({
                    message: 'Tipografía por archivo de fuente obtenida correctamente',
                    data: typegraphArchiveFont
                });
            }
            else{
                return res.status(400).json({ error: 'Archivo de fuente no proporcionado' });
            }
        }
        catch(error){
            console.error('Error al obtener la tipografía por archivo de fuente:', error);
            return res.status(500).json({ error: 'Error al obtener la tipografía por archivo de fuente' });
        }
    }

    // Crear una nueva tipografia con su Tipografia principal y secundaria
    createTipographyMain = async ( req, res ) => {
        try{
            const { originalname, path } = req.file;
            const body = {
                ...req.body,
                name_tipography_main: originalname,
                tam_font: parseInt(req.body.tam_font),
                tam_paragraph: parseInt(req.body.tam_paragraph),
                tam_title: parseInt(req.body.tam_title),
                tam_subtitle: parseInt(req.body.tam_subtitle),
                archive_font: path
            }
            const result = validateTipographyMain(body);
            const { id_user } = req.params;
            if(!result.success) return res.status(400).json({ error: result.error.errors });
            const newTipography = await this.ModelsTypography.createTipographyMain({typography: result.data, id_user});
            return res.status(201).json({
                message: 'Tipografía principal creada correctamente',
                data: newTipography
            });
        }
        catch(error){
            console.error('Error al crear la tipografía principal:', error);
            return res.status(500).json({ error: 'Error al crear la tipografía principal' });
        }
    }

    // Crear una nueva tipografia con su Tipografia secundaria
    createTipographySecondary = async ( req, res ) => {
        try{
            const { originalname, path } = req.file;
            const body = {
                ...req.body,
                name_tipography_secondary: originalname,
                tam_font: parseInt(req.body.tam_font),
                tam_paragraph: parseInt(req.body.tam_paragraph),
                tam_title: parseInt(req.body.tam_title),
                tam_subtitle: parseInt(req.body.tam_subtitle),
                archive_font: path
            }
            const result = validateTipographySecondary(body);
            const { id_user } = req.params;
            if(!result.success) return res.status(400).json({ error: result.error.errors });
            const newTipography = await this.ModelsTypography.createTipographySecondary({typography: result.data, id_user});
            return res.status(201).json({
                message: 'Tipografía secundaria creada correctamente',
                data: newTipography
            });
        }
        catch(error){
            console.error('Error al crear la tipografía secundaria:', error);
            return res.status(500).json({ error: 'Error al crear la tipografía secundaria' });
        }
    }
    
    // Crear una nueva tipografia con su Tipografia principal y secundaria
    createTipography = async ( req, res ) => {
        try{
            const mainFont = req.files.main_font[0];
            const secondaryFont = req.files.secondary_font[0];

            const mainPath = mainFont.path;
            console.log('Ruta de la fuente principal:', mainPath);

            const body = {
                ...req.body,
                name_tipography_main: mainFont.originalname,
                name_tipography_secondary: secondaryFont.originalname,
                // tam_font: parseInt(req.body.tam_font),
                tam_paragraph: parseInt(req.body.tam_paragraph),
                tam_title: parseInt(req.body.tam_title),
                tam_subtitle: parseInt(req.body.tam_subtitle),
                archive_font_main: mainFont.path,
                archive_font_secondary: secondaryFont.path,
                is_selected: req.body.is_selected === 'true'
            }
            const result = validateTipography(body);
            const id_user = req.user.id;
            if(!result.success) return res.status(400).json({ error: result.error.errors });
            const newTipography = await this.ModelsTypography.createTipography({typography: result.data, id_user});
            return res.status(201).json({
                message: 'Tipografía creada correctamente',
                data: newTipography
            });
        }
        catch(error){
            console.error('Error al crear la tipografía:', error);
            return res.status(500).json({ error: 'Error al crear la tipografía' });
        }
    }

    // Actualizar una tipografia por su ID
    updateByID = async (req, res) => {
        try {
          const { id_tipography } = req.params;
      
          // Validar si vienen archivos y extraerlos con seguridad
          const mainFontFile = req.files?.main_font?.[0];
          const secondaryFontFile = req.files?.secondary_font?.[0];
      
          // Construir objeto body con campos obligatorios y opcionales
          const body = {
            ...req.body,
            tam_paragraph: req.body.tam_paragraph ? parseInt(req.body.tam_paragraph) : undefined,
            tam_title: req.body.tam_title ? parseInt(req.body.tam_title) : undefined,
            tam_subtitle: req.body.tam_subtitle ? parseInt(req.body.tam_subtitle) : undefined,
            is_selected: req.body.is_selected === 'true'
          };
      
          // Si se envió archivo main_font, agregar propiedades relacionadas
          if (mainFontFile) {
            body.name_tipography_main = mainFontFile.originalname;
            body.archive_font_main = mainFontFile.path;
          }
      
          // Si se envió archivo secondary_font, agregar propiedades relacionadas
          if (secondaryFontFile) {
            body.name_tipography_secondary = secondaryFontFile.originalname;
            body.archive_font_secondary = secondaryFontFile.path;
          }
      
          if (!id_tipography) {
            return res.status(400).json({ error: 'ID de tipografía no proporcionado' });
          }
      
          // Validar datos (ajusta la función para que acepte campos opcionales)
          const result = validateTipographyUpdate(body);
          if (!result.success) {
            return res.status(400).json({ error: result.error.errors });
          }
      
          const updatedTipography = await this.ModelsTypography.updateByID({ id_tipography, typography: result.data });
      
          return res.status(200).json({
            message: 'Tipografía actualizada correctamente',
            data: updatedTipography
          });
        } catch (error) {
          console.error('Error al actualizar la tipografía por ID:', error);
          return res.status(500).json({ error: 'Error al actualizar la tipografía por ID' });
        }
      };
      


    // Eliminar una tipografia por su ID
    deleteByID = async ( req, res ) => {
        try{
            const { id_tipography } = req.params;
            if(id_tipography){
                const deletedTipography = await this.ModelsTypography.deleteByID({id_tipography});
                return res.status(200).json({
                    message: 'Tipografía eliminada correctamente',
                    data: deletedTipography
                });
            }
            else{
                return res.status(400).json({ error: 'ID de tipografía no proporcionado' });
            }
        }
        catch(error){
            console.error('Error al eliminar la tipografía por ID:', error);
            return res.status(500).json({ error: 'Error al eliminar la tipografía por ID' });
        }
    }

    // Seleccionar una tipografía por el usuario
    selectTypography = async (req, res) => {
        try {
            const { id_tipography } = req.body;
            console.log('Datos recibidos para seleccionar tipografía:', req.body);
    
            if (!id_tipography) {
                return res.status(400).json({ error: 'ID de tipografía son requeridos' });
            }
    
            const updatedTypography = await this.ModelsTypography.selectTypography({ id_tipography });
    
            if (updatedTypography) {
                return res.status(200).json({
                    message: 'Tipografía seleccionada correctamente',
                    data: updatedTypography
                });
            } else {
                return res.status(404).json({ error: 'No se pudo seleccionar la tipografía' });
            }
        } catch (error) {
            console.error('Error al seleccionar la tipografía:', error);
            return res.status(500).json({ error: 'Error al seleccionar la tipografía' });
        }
    }    
    
    getSelectedTypography = async ( req, res ) => {
        try {
            const typography = await this.ModelsTypography.getSelectedTypography();
            return res.status(200).json({
                message: 'Tipografía encontrada correctamente',
                data: typography
            });
        } catch (error) {
            console.error('Error al obtener la tipografía seleccionada:', error);
            return res.status(500).json({ error: 'Error al obtener la tipografía seleccionada' });
        }
    }
}