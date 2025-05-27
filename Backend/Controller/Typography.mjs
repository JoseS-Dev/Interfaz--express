import { validateTipography, 
    validateTipographyMain, 
    validateTipographySecondary } 
    from "../Validations/SchemaTipography";

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
    // Obtener una tipografia por su tamaño de font
    getByFontSize = async ( req, res ) => {
        try{
            const { tam_font } = req.params;
            if(tam_font){
                const typegraphFontSize = await this.ModelsTypography.getByFontSize({tam_font});
                return res.status(200).json({
                    message: 'Tipografía por tamaño de fuente obtenida correctamente',
                    data: typegraphFontSize
                });
            }
            else{
                return res.status(400).json({ error: 'Tamaño de fuente no proporcionado' });
            }
        }
        catch(error){
            console.error('Error al obtener la tipografía por tamaño de fuente:', error);
            return res.status(500).json({ error: 'Error al obtener la tipografía por tamaño de fuente' });
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
}