import zod from 'zod';

export const schemaUser = zod.object({
    name: zod.string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    }),
    email: zod.string({
        required_error: 'El email es requerido',
        invalid_type_error: 'El email debe ser una cadena de texto'
    }).email('El email no es válido'),
    password: zod.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser una cadena de texto'
    }).min(8, 'La contraseña debe tener al menos 8 caracteres'),
    username: zod.string({
        required_error: 'El nombre de usuario es requerido',
        invalid_type_error: 'El nombre de usuario debe ser una cadena de texto'
    }).min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
})

export function validateUser(user){
    return schemaUser.safeParse(user);
}