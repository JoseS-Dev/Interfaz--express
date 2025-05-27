import zod from 'zod';

// Para cuando se crea con la tipografia principal y secundaria
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
    }),
    archive_font: zod.string({
        required_error: 'El archivo de la fuente es requerido',
        invalid_type_error: 'El archivo de la fuente debe ser una cadena de texto'
    }).url({
        message: 'El archivo de la fuente debe ser una URL válida'
    })
})

// Cuando se crea con solo la tipografía principal
export const schemaTipographyMain = zod.object({
    name_tipography_main: zod.string({
        required_error: 'El nombre de la tipografía principal es requerido',
        invalid_type_error: 'El nombre de la tipografía principal debe ser una cadena de texto'
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
    }),
    archive_font: zod.string({
        required_error: 'El archivo de la fuente es requerido',
        invalid_type_error: 'El archivo de la fuente debe ser una cadena de texto'
    }).url({
        message: 'El archivo de la fuente debe ser una URL válida'
    })
})

// Cuando se crea con solo la tipografía secundaria
export const schemaTipographySecondary = zod.object({
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
    }),
    archive_font: zod.string({
        required_error: 'El archivo de la fuente es requerido',
        invalid_type_error: 'El archivo de la fuente debe ser una cadena de texto'
    }).url({
        message: 'El archivo de la fuente debe ser una URL válida'
    })
})





// Function para validar la tipografía cuando se crea con su tipografía principal y secundaria
export function validateTipography(tipography) {
    return schemaTipography.safeParse(tipography);
}
// Function para validar la tipografía cuando se crea con solo su tipografía principal
export function validateTipographyMain(tipography) {
    return schemaTipographyMain.safeParse(tipography);
}
// Function para validar la tipografía cuando se crea con solo su tipografía secundaria
export function validateTipographySecondary(tipography) {
    return schemaTipographySecondary.safeParse(tipography);
}
// Function para validar la tipografía a la hora de modificar
export function validateTipographyUpdate(tipography) {
    return schemaTipography.partial().safeParse(tipography);
}