import { validateColors, validateColorsUpdate } from "../Validations/SchemaColors.mjs";

export class ColorsController {
    constructor({ ModelsColors }){
        this.ModelsColors = ModelsColors;
    }

    // Obtener todos los colores
    getAll = async (req, res) => {
        try {
            const colors = await this.ModelsColors.getAll();
            if(colors){
                res.status(200).json(colors);
            } else {
                res.status(404).json({message: 'No se encontraron colores'});
            }
        } catch (error) {
            console.error('Error al obtener los colores:', error);
            res.status(500).json({message: 'Error interno del servidor'});
        }
    }

    // Obtener un color por su ID
    getByID = async (req, res) => {
        try{
            const { id_colors } = req.params;
            const color = await this.ModelsColors.getByID({ id_colors });
            if(color){
                res.status(200).json(color);
            } else {
                res.status(404).json({message: `No se encontró el color con ID ${id_colors}`});
            }
        }
        catch (error) {
            console.error(`Error al obtener el color con ID ${req.params.id_colors}:`, error);
            res.status(500).json({message: 'Error interno del servidor'});
        }
    }
    
    // Obtener colores seleccionados por el usuario
    getSelectedColors = async ( req, res ) => {
        try{
            const id_user = req.user.id;

            if (!id_user) return res.status(400).json({ error: 'ID de usuario no proporcionado' });

            const colores = await this.ModelsColors.getSelectedColors({ id_user });
            return res.status(200).json({
                message: 'Colores encontrados correctamente',
                data: colores
            });
        }
        catch(error){
            console.error('Error al obtener los colores seleccionados:', error);
            return res.status(500).json({ error: 'Error al obtener los colores seleccionados' });
        }
    }

    // Obtener un color por su color principal
    getByPrimaryColor = async (req, res) => {
        try{
            const { primary_color } = req.params;
            const color = await this.ModelsColors.getByPrimaryColor({ primary_color });
            if(color){
                res.status(200).json(color);
            } else {
                res.status(404).json({message: `No se encontró el color principal ${primary_color}`});
            }
        }
        catch (error) {
            console.error(`Error al obtener el color principal ${req.params.primary_color}:`, error);
            res.status(500).json({message: 'Error interno del servidor'});
        }
    }

    // Obtener un color por su color secundario
    getBySecondaryColor = async (req, res) => {
        try{
            const { secondary_color } = req.params;
            const color = await this.ModelsColors.getBySecondaryColor({ secondary_color });
            if(color){
                res.status(200).json(color);
            } else {
                res.status(404).json({message: `No se encontró el color secundario ${secondary_color}`});
            }
        }
        catch (error) {
            console.error(`Error al obtener el color secundario ${req.params.secondary_color}:`, error);
            res.status(500).json({message: 'Error interno del servidor'});
        }
    }

    // Obtener un color por su color terciario
    getByTernaryColor = async (req, res) => {
        try{
            const { ternary_color } = req.params;
            const color = await this.ModelsColors.getByTernaryColor({ ternary_color });
            if(color){
                res.status(200).json(color);
            } else {
                res.status(404).json({message: `No se encontró el color terciario ${ternary_color}`});
            }
        }
        catch (error) {
            console.error(`Error al obtener el color terciario ${req.params.ternary_color}:`, error);
            res.status(500).json({message: 'Error interno del servidor'});
        }
    }

    // Obtener un color por su color cuaternario
    getByCuarternaryColor = async (req, res) => {
        try{
            const { cuarternary_color } = req.params;
            const color = await this.ModelsColors.getByCuarternaryColor({ cuarternary_color });
            if(color){
                res.status(200).json(color);
            } else {
                res.status(404).json({message: `No se encontró el color cuaternario ${cuarternary_color}`});
            }
        }
        catch (error) {
            console.error(`Error al obtener el color cuaternario ${req.params.cuarternary_color}:`, error);
            res.status(500).json({message: 'Error interno del servidor'});
        }
    }

    // Obtener un color por su color neutral
    getByNeutralColor = async (req, res) => {
        try{
            const { neutral_color } = req.params;
            const color = await this.ModelsColors.getByNeutralColor({ neutral_color });
            if(color){
                res.status(200).json(color);
            } else {
                res.status(404).json({message: `No se encontró el color neutral ${neutral_color}`});
            }
        }
        catch (error) {
            console.error(`Error al obtener el color neutral ${req.params.neutral_color}:`, error);
            res.status(500).json({message: 'Error interno del servidor'});
        }
    }

    // Crear un nuevo conjunto color
    createColor = async (req, res) => {
        console.log('Creando color con datos:', req.body);
        try{
            const result = validateColors(req.body);
            const id_user = req.user.id; 
            console.log(req.body)
            if(!result.success){
                return res.status(400).json({message: 'Datos de color inválidos', errors: result.error.errors});
            }
            const color = await this.ModelsColors.createColor({ color: result.data, id_user });
            if(color){
                res.status(201).json({message: 'Color creado correctamente', color});
            } else {
                res.status(400).json({message: 'Error al crear el color'});
            }
        }
        catch (error) {
            console.error('Error al crear el color:', error);
            res.status(500).json({message: 'Error interno del servidor'});
        }
    }

    // Actualizar un conjunto de colores
    updateByID = async (req, res) => {
        try{
            const { id_colors } = req.params;
            const result = validateColorsUpdate(req.body);
            if(!result.success){
                return res.status(400).json({message: 'Datos de color inválidos', errors: result.error.errors});
            }
            const color = await this.ModelsColors.updateByID({ id_colors, color: result.data });
            if(color){
                res.status(200).json({message: 'Color actualizado correctamente', color});
            } else {
                res.status(404).json({message: `No se encontró el color con ID ${id_colors}`});
            }
        }
        catch (error) {
            console.error(`Error al actualizar el color con ID ${req.params.id_colors}:`, error);
            res.status(500).json({message: 'Error interno del servidor'});
        }
    }

    // Eliminar un conjunto de colores
    deleteByID = async (req, res) => {
        try{
            const { id_colors } = req.params;
            const color = await this.ModelsColors.deleteByID({ id_colors });
            if(color){
                res.status(200).json({message: `Color con ID ${id_colors} eliminado correctamente`});
            } else {
                res.status(404).json({message: `No se encontró el color con ID ${id_colors}`});
            }
        }
        catch (error) {
            console.error(`Error al eliminar el color con ID ${req.params.id_colors}:`, error);
            res.status(500).json({message: 'Error interno del servidor'});
        }
    }

    // Método para seleccionar un color para un usuario
    selectColor = async (req, res) => {
        try {
            const { id_colors } = req.body;
            const id_user = req.user.id;

            if (!id_user || !id_colors) {
                return res.status(400).json({ error: 'ID de usuario y ID de color son requeridos' });
            }

            const updatedColor = await this.ModelsColors.selectColor({ id_user, id_colors });

            if (updatedColor) {
                return res.status(200).json({
                    message: 'Color seleccionado correctamente',
                    data: updatedColor
                });
            } else {
                return res.status(404).json({ error: 'No se pudo seleccionar el color' });
            }
        } catch (error) {
            console.error('Error al seleccionar el color:', error);
            return res.status(500).json({ error: 'Error al seleccionar el color' });
        }
    }
}