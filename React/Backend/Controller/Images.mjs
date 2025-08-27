import {validateImageData, validateImageUpdateData} from '../Validations/SchemaImages.mjs';
import sharp from 'sharp';
export class ControllerImages {
    constructor({ModelsImages}){
        this.ModelsImages = ModelsImages;
    }

    // Obtener todas las imagenes
    getAllImages = async (req, res) => {
        try{
            const images = await this.ModelsImages.getAllImages();
            return res.status(200).json({
                message: "Imagenes obtenidas correctamente",
                data: images
            });
        }
        catch(error){
            console.error("Error al obtener las imagenes:", error);
            return res.status(500).json({message: "Error al obtener las imagenes"});
        }
    }

    // Obtener una imagen por su ID
    getImageByID = async (req, res) => {
        const {id_image} = req.params;
        try{
            const imageID = await this.ModelsImages.getImageByID({id_image});
            if(imageID){
                return res.status(200).json({
                    message: "Imagen obtenida correctamente",
                    data: imageID
                });
            }
        }
        catch(error){
            console.error("Error al obtener la imagen por ID:", error);
            return res.status(500).json({message: "Error al obtener la imagen por ID"});
        }
    }

    // Obtener una imagen por su formato
    getImageByFormat = async (req, res) => {
        const { format_image } = req.params;
        try{
            const imageFormat = await this.ModelsImages.getImageByFormat({format_image})
            if(imageFormat){
                return res.status(200).json({
                    message: "Imagen obtenida correctamente por formato",
                    data: imageFormat
                });
            }
        }
        catch(error){
            console.error("Error al obtener la imagen por formato:", error);
            return res.status(500).json({message: "Error al obtener la imagen por formato"});
        }
    }

    // Obtener una imagen por su tamaño
    getImageBySize = async (req, res) => {
        const { size_image} = req.params;
        try{
            const imageSize = await this.ModelsImages.getImageBySize({size_image});
            if(imageSize){
                return res.status(200).json({
                    message: "Imagen obtenida correctamente por tamaño",
                    data: imageSize
                });
            }
        }
        catch(error){
            console.error("Error al obtener la imagen por tamaño:", error);
            return res.status(500).json({message: "Error al obtener la imagen por tamaño"});
        }
    }

    // Crear una nueva imagen
    createImage = async (req, res) => {
        const id_user = req.user.id;
        if(!req.file){
            return res.status(400).json({message: "No se ha subido ninguna imagen"});
        }
        console.log("Imagen recibida:", req.file);
        // Obtenemos las dimesiones de la imagen
        const dimensions = await sharp(req.file.path).metadata();
        
        const imageData = {
            name_image: req.file.originalname,
            format_image: req.file.mimetype.split('/')[1],
            size_image: req.file.size / 1024, // Convertir a MB
            dimension_image: `${dimensions.width}x${dimensions.height}`,
            url_image: req.file.path
        }
        console.log("Datos de la imagen:", imageData);
        const result = validateImageData(imageData);
        try{
            if(!result.success){
                return res.status(400).json({message: result.error.message});
            }
            const newImage = await this.ModelsImages.createImage({image: result.data, id_user});
            if(newImage){
                return res.status(201).json({
                    message: "Imagen creada correctamente",
                    data: newImage
                });
            }
        }
        catch(error){
            console.error("Error al crear la imagen:", error);
            return res.status(500).json({message: "Error al crear la imagen"});
        }
    }

    // Eliminar una imagen
    deleteImage = async (req, res) => {
        const {id_image} = req.params;
        try{
            const deletedImage = await this.ModelsImages.deleteImage({id_image});
            if(deletedImage){
                return res.status(200).json({
                    message: "Imagen eliminada correctamente",
                    data: deletedImage
                });
            }
        }
        catch(error){
            console.error("Error al eliminar la imagen:", error);
            return res.status(500).json({message: "Error al eliminar la imagen"});
        }
    }

    // Actualizar una imagen
    updateImage = async (req, res) => {
        const {id_image} = req.params;
        if(!req.file){
            return res.status(400).json({message: "No se ha subido ninguna imagen"});
        }
        const dimensions = await sharp(req.file.path).metadata();
        const imageData = {
            name_image: req.file.originalname,
            format_image: req.file.mimetype.split('/')[1],
            size_image: req.file.size / 1024, // Convertir a MB
            dimension_image: `${dimensions.width}x${dimensions.height}`,
            url_image: req.file.path
        }
        const result = validateImageUpdateData(imageData);
        try{
            if(!result.success){
                return res.status(400).json({message: result.error.message});
            }
            const updatedImage = await this.ModelsImages.updateImage({id_image, image: result.data});
            if(updatedImage){
                return res.status(200).json({
                    message: "Imagen actualizada correctamente",
                    data: updatedImage
                });
            }
        }
        catch(error){
            console.error("Error al actualizar la imagen:", error);
            return res.status(500).json({message: "Error al actualizar la imagen"});
        }
    }

    // Seleccionar una imagen
    selectImage = async (req, res) => {
        const {id_image} = req.params;
        try{
            const selectedImage = await this.ModelsImages.selectImage({id_image});
            if(selectedImage){
                return res.status(200).json({
                    message: "Imagen seleccionada correctamente",
                    data: selectedImage
                });
            }
            else{
                return res.status(404).json({message: "Imagen no encontrada"});
            }
        }
        catch(error){
            console.error("Error al seleccionar la imagen:", error);
            return res.status(500).json({message: "Error al seleccionar la imagen"});
        }
    }
}