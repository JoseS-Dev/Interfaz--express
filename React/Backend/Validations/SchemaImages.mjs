import zod from 'zod';


// Defino el esquema de validación para la subida de imagenes
export const SchemaImages = zod.object({
    
    name_image: zod.string({
        required_error: 'El nombre de la imagen es requerido',
        invalid_type_error: 'El nombre de la imagen debe ser una cadena de texto'
    }),
    
    format_image: zod.string({
        required_error: 'El formato de la imagen es requerido',
        invalid_type_error: 'El formato de la imagen debe ser una cadena de texto'
    }).refine(value => {
        const validTypes = ['jpg', 'jpeg', 'png', 'gif'];
        return validTypes.includes(value.toLowerCase());
    }, {
        message: 'El formato de la imagen debe ser jpg, jpeg, png o gif'
    }),
    
    size_image: zod.number({
        required_error: 'El tamaño de la imagen es requerido',
        invalid_type_error: 'El tamaño de la imagen debe ser un número'
    }),
    
    dimesion_image: zod.string({
        required_error: 'La dimensión de la imagen es requerida',
        invalid_type_error: 'La dimensión de la imagen debe ser una cadena de texto'
    }).regex(/^\d+x\d+$/, {
        message: 'La dimensión de la imagen debe tener el formato ancho x alto (ejemplo: 1920x1080)'
    }),
    
    url_image: zod.string({
        required_error: 'La URL de la imagen es requerida',
        invalid_type_error: 'La URL de la imagen debe ser una cadena de texto'
    }).url({
        message: 'La URL de la imagen debe ser una URL válida'
    })
})

// Funcion para validar los datos de la imagen cuando se crea
export function validateImageData(data) {
    return SchemaImages.parse(data);
}

// Funcion para validar los datos de la imagen cuando se actualiza
export function validateImageUpdateData(data) {
    return SchemaImages.partial().parse(data);
}