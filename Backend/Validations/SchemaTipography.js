import zod from 'zod';

export const schemaTipography = zod.object({
    name_tipography_main: zod.string({
        required_error: 'El nombre de la tipografía principal es requerido',
        invalid_type_error: 'El nombre de la tipografía principal debe ser una cadena de texto'
    }),
    name_tipography_secondary: zod.string({
        required_error: 'El nombre de la tipografía secundaria es requerido',
        invalid_type_error: 'El nombre de la tipografía secundaria debe ser una cadena de texto'
    }),
    tam_font: zod.number({
        required_error: 'El tamaño de la fuente es requerido',
        invalid_type_error: 'El tamaño de la fuente debe ser un número'
    }),
    tam_paragraph: zod.number({
        required_error: 'El tamaño del párrafo es requerido',
        invalid_type_error: 'El tamaño del párrafo debe ser un número'
    }),
    tam_title: zod.number({
        required_error: 'El tamaño del título es requerido',
        invalid_type_error: 'El tamaño del título debe ser un número'
    }),
    tam_subtitle: zod.number({
        required_error: 'El tamaño del subtítulo es requerido',
        invalid_type_error: 'El tamaño del subtítulo debe ser un número'
    })
})

// Function para validar la tipografía
export function validateTipography(tipography) {
    return schemaTipography.safeParse(tipography);
}
// Function para validar la tipografía a la hora de modificar
export function validateTipographyUpdate(tipography) {
    return schemaTipography.partial().safeParse(tipography);
}