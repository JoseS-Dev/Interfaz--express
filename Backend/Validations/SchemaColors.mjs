import zod from 'zod';

export const schemaColors = zod.object({
    primary_color: zod.string({
        required_error: 'El color primario es requerido',
        invalid_type_error: 'El color primario debe ser una cadena de texto'
    }),
    secondary_color: zod.string({
        required_error: 'El color secundario es requerido',
        invalid_type_error: 'El color secundario debe ser una cadena de texto'
    }),
    ternary_color: zod.string({
        required_error: 'El color terciario es requerido',
        invalid_type_error: 'El color terciario debe ser una cadena de texto'
    }),
    cuarternary_color: zod.string({
        required_error: 'El color cuaternario es requerido',
        invalid_type_error: 'El color cuaternario debe ser una cadena de texto'
    }),
    neutral_color: zod.string({
        required_error: 'El color neutral es requerido',
        invalid_type_error: 'El color neutral debe ser una cadena de texto'
    }),
})

// Function para validar los colores
export function validateColors(colors){
    return schemaColors.safeParse(colors);
}

// Function para validar los colores a la hora de modificar
export function validateColorsUpdate(colors){
    return schemaColors.partial().safeParse(colors);
}