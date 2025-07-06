import zod from 'zod';

export const schemaUser = zod.object({
    name_user: zod.string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    }),
    maiden_name_user: zod.string({
        required_error: 'El apellido es requerido',
        invalid_type_error: 'El apellido debe ser una cadena de texto'
    }),
    email_user: zod.string({
        required_error: 'El email es requerido',
        invalid_type_error: 'El email debe ser una cadena de texto'
    }).email('El email no es válido'),
    password_user: zod.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser una cadena de texto'
    }).min(8, 'La contraseña debe tener al menos 8 caracteres'),
    username: zod.string({
        required_error: 'El nombre de usuario es requerido',
        invalid_type_error: 'El nombre de usuario debe ser una cadena de texto'
    }).min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
    age_user: zod.string({
        required_error: 'La edad es requerida',
        invalid_type_error: 'La edad debe ser un número'
    }),
    phone_user: zod.string({
        required_error: 'El teléfono es requerido',
        invalid_type_error: 'El teléfono debe ser una cadena de texto'
    }),
    birth_date_user: zod.string({
        required_error: 'La fecha de nacimiento es requerida',
        invalid_type_error: 'La fecha de nacimiento debe ser una cadena de texto'
    }).refine(date => {
        const parseDate = new Date(date);
        return !isNaN(parseDate.getTime());
    }),
    gender_user: zod.string({
        required_error: 'El genero del usuario es requerido',
        invalid_type_error: 'El genero debe ser un string'
    }),
    image_user: zod.string({
        required_error: 'La imagen es requerida',
        invalid_type_error: 'La imagen debe ser una cadena de texto'
    }).url('La imagen debe ser una URL válida'),
    blood_group_user: zod.string({
        required_error: 'El grupo sanguíneo es requerido',
        invalid_type_error: 'El grupo sanguíneo debe ser una cadena de texto'
    }).refine(value => {
        const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        return validGroups.includes(value);
    }),
    height_user: zod.string({
        required_error: 'La altura es requerida',
        invalid_type_error: 'La altura debe ser un número'
    }),
    weight_user: zod.string({
        required_error: 'El peso es requerido',
        invalid_type_error: 'El peso debe ser un número'
    }),
    eye_color_user: zod.string({
        required_error: 'El color de ojos es requerido',
        invalid_type_error: 'El color de ojos debe ser una cadena de texto'
    }),
    hair_user: zod.string({
        required_error: 'El color de cabello es requerido',
        invalid_type_error: 'El color de cabello debe ser una cadena de texto'
    }),
    ip_user: zod.string({
        required_error: 'La IP es requerida',
        invalid_type_error: 'La IP debe ser una cadena de texto'
    }),
    mac_address_user: zod.string({
        required_error: 'La dirección MAC es requerida',
        invalid_type_error: 'La dirección MAC debe ser una cadena de texto'
    }),
    university_user: zod.string({
        required_error: 'La universidad es requerida',
        invalid_type_error: 'La universidad debe ser una cadena de texto'
    }),
    ein_user: zod.string({
        required_error: 'El EIN es requerido',
        invalid_type_error: 'El EIN debe ser una cadena de texto'
    }),
    ssn_user: zod.string({
        required_error: 'El SSN es requerido',
        invalid_type_error: 'El SSN debe ser una cadena de texto'
    }),
    user_agent_user: zod.string({
        required_error: 'El agente de usuario es requerido',
        invalid_type_error: 'El agente de usuario debe ser una cadena de texto'
    }),
    role_user: zod.string({
        required_error: 'El rol es requerido',
        invalid_type_error: 'El rol debe ser una cadena de texto'
    }).refine(value => {
        const validRoles = ['admin', 'user']
        return validRoles.includes(value);
    }),
    street_address: zod.string({
        required_error: 'La dirección es requerida',
        invalid_type_error: 'La dirección debe ser una cadena de texto'
    }),
    city_address: zod.string({
        required_error: 'La ciudad es requerida',
        invalid_type_error: 'La ciudad debe ser una cadena de texto'
    }),
    state_address: zod.string({
        required_error: 'El estado es requerido',
        invalid_type_error: 'El estado debe ser una cadena de texto'
    }),
    state_code_address: zod.string({
        required_error: 'El código de estado es requerido',
        invalid_type_error: 'El código de estado debe ser una cadena de texto'
    }).refine(value => {
        const regex = /^[A-Z]{2}$/;
        return regex.test(value);
    }),
    postal_code_address: zod.string({
        required_error: 'El código postal es requerido',
        invalid_type_error: 'El código postal debe ser una cadena de texto'
    }),
    latitude_address: zod.number({
        required_error: 'La latitud es requerida',
        invalid_type_error: 'La latitud debe ser un número'
    }).refine(value => {
        return value >= -90 && value <= 90;
    }),
    longitude_address: zod.number({
        required_error: 'La longitud es requerido',
        invalid_type_error: 'La longitud debe ser un número'
    }).refine(value => {
        return value >= -180 && value <= 180;
    }),
    country_address: zod.string({
        required_error: 'El país es requerido',
        invalid_type_error: 'El país debe ser una cadena de texto'
    }),
    card_expire_user: zod.string({
        required_error: 'La fecha de expiración de la tarjeta es requerida',
        invalid_type_error: 'La fecha de expiración de la tarjeta debe ser una cadena de texto'
    }).refine(date => {
        const parseDate = new Date(date);
        return !isNaN(parseDate.getTime())
    }),
    card_number_user: zod.string({
        required_error: 'El número de tarjeta es requerido',
        invalid_type_error: 'El número de tarjeta debe ser una cadena de texto'
    }),
    card_type_user: zod.string({
        required_error: 'El tipo de tarjeta es requerido',
        invalid_type_error: 'El tipo de tarjeta debe ser una cadena de texto'
    }).refine(value => {
        const validTypes = ['Visa', 'MasterCard', 'American Express', 'Discover'];
        return validTypes.includes(value);
    }),
    currency_user: zod.string({
        required_error: 'La moneda es requerida',
        invalid_type_error: 'La moneda debe ser una cadena de texto'
    }).refine(value => {
        const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];
        return validCurrencies.includes(value);
    }),
    iban_user: zod.string({
        required_error: 'El IBAN es requerido',
        invalid_type_error: 'El IBAN debe ser una cadena de texto'
    }).refine(value => {
        const regex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
        return regex.test(value);
    }),
    department_company_user: zod.string({
        required_error: 'El departamento de la empresa es requerido',
        invalid_type_error: 'El departamento de la empresa debe ser una cadena de texto'
    }),
    company_name_user: zod.string({
        required_error: 'El nombre de la empresa es requerido',
        invalid_type_error: 'El nombre de la empresa debe ser una cadena de texto'
    }),
    company_title_user: zod.string({
        required_error: 'El título de la empresa es requerido',
        invalid_type_error: 'El título de la empresa debe ser una cadena de texto'
    }),
    company_street_user: zod.string({
        required_error: 'La dirección de la empresa es requerida',
        invalid_type_error: 'La dirección de la empresa debe ser una cadena de texto'
    }),
    company_city_user: zod.string({
        required_error: 'La ciudad de la empresa es requerida',
        invalid_type_error: 'La ciudad de la empresa debe ser una cadena de texto'
    }),
    company_state_user: zod.string({
        required_error: 'El estado de la empresa es requerido',
        invalid_type_error: 'El estado de la empresa debe ser una cadena de texto'
    }),
    company_state_code_user: zod.string({
        required_error: 'El código de estado de la empresa es requerido',
        invalid_type_error: 'El código de estado de la empresa debe ser una cadena de texto'
    }).refine(value => {
        const regex = /^[A-Z]{2}$/;
        return regex.test(value);
    }),
    company_postal_code_user: zod.string({
        required_error: 'El código postal de la empresa es requerido',
        invalid_type_error: 'El código postal de la empresa debe ser una cadena de texto'
    }),
    company_latitude_user: zod.number({
        required_error: 'La latitud de la empresa es requerida',
        invalid_type_error: 'La latitud de la empresa debe ser un número'
    }).refine(value => {
        return value >= -90 && value <= 90;
    }),
    company_longitude_user: zod.number({
        required_error: 'La longitud de la empresa es requerida',
        invalid_type_error: 'La longitud de la empresa debe ser un número'
    }).refine(value => {
        return value >= -180 && value <= 180;
    }),
    company_country_user: zod.string({
        required_error: 'El país de la empresa es requerido',
        invalid_type_error: 'El país de la empresa debe ser una cadena de texto'
    }),
    coin_user: zod.string({
        required_error: "La moneda de bitcoin es requerida",
        invalid_type_error: "La moneda de bitcoin debe ser una cadena de texto"
    }),
    wallet_address_user: zod.string({
        required_error: "La dirección de la billetera es requerida",
        invalid_type_error: "La dirección de la billetera debe ser una cadena de texto"
    }).refine(value => {
        const regex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
        return regex.test(value);
    }),
    network_user: zod.string({
        required_error: "La red de bitcoin es requerida",
        invalid_type_error: "La red de bitcoin debe ser una cadena de texto"
    })

})

export const schemaUserUpdate = zod.object({
    name_user: zod.string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    }),
    maiden_name_user: zod.string({
        required_error: 'El apellido es requerido',
        invalid_type_error: 'El apellido debe ser una cadena de texto'
    }),
    email_user: zod.string({
        required_error: 'El email es requerido',
        invalid_type_error: 'El email debe ser una cadena de texto'
    }).email('El email no es válido'),
    password_user: zod.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser una cadena de texto'
    }).min(8, 'La contraseña debe tener al menos 8 caracteres'),
    username: zod.string({
        required_error: 'El nombre de usuario es requerido',
        invalid_type_error: 'El nombre de usuario debe ser una cadena de texto'
    }).min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
    age_user: zod.number({
        required_error: 'La edad es requerida',
        invalid_type_error: 'La edad debe ser un número'
    }),
    phone_user: zod.string({
        required_error: 'El teléfono es requerido',
        invalid_type_error: 'El teléfono debe ser una cadena de texto'
    }),
    birth_date_user: zod.string({
        required_error: 'La fecha de nacimiento es requerida',
        invalid_type_error: 'La fecha de nacimiento debe ser una cadena de texto'
    }).refine(date => {
        const parseDate = new Date(date);
        return !isNaN(parseDate.getTime());
    }),
    gender_user: zod.string({
        required_error: 'El genero del usuario es requerido',
        invalid_type_error: 'El genero debe ser un string'
    }),
    image_user: zod.string({
        required_error: 'La imagen es requerida',
        invalid_type_error: 'La imagen debe ser una cadena de texto'
    }).url('La imagen debe ser una URL válida'),
    blood_group_user: zod.string({
        required_error: 'El grupo sanguíneo es requerido',
        invalid_type_error: 'El grupo sanguíneo debe ser una cadena de texto'
    }).refine(value => {
        const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        return validGroups.includes(value);
    }),
    height_user: zod.number({
        required_error: 'La altura es requerida',
        invalid_type_error: 'La altura debe ser un número'
    }),
    weight_user: zod.number({
        required_error: 'El peso es requerido',
        invalid_type_error: 'El peso debe ser un número'
    }),
    eye_color_user: zod.string({
        required_error: 'El color de ojos es requerido',
        invalid_type_error: 'El color de ojos debe ser una cadena de texto'
    }),
    hair_user: zod.string({
        required_error: 'El color de cabello es requerido',
        invalid_type_error: 'El color de cabello debe ser una cadena de texto'
    }),
    ip_user: zod.string({
        required_error: 'La IP es requerida',
        invalid_type_error: 'La IP debe ser una cadena de texto'
    }),
    mac_address_user: zod.string({
        required_error: 'La dirección MAC es requerida',
        invalid_type_error: 'La dirección MAC debe ser una cadena de texto'
    }),
    university_user: zod.string({
        required_error: 'La universidad es requerida',
        invalid_type_error: 'La universidad debe ser una cadena de texto'
    }),
    ein_user: zod.string({
        required_error: 'El EIN es requerido',
        invalid_type_error: 'El EIN debe ser una cadena de texto'
    }),
    ssn_user: zod.string({
        required_error: 'El SSN es requerido',
        invalid_type_error: 'El SSN debe ser una cadena de texto'
    }),
    user_agent_user: zod.string({
        required_error: 'El agente de usuario es requerido',
        invalid_type_error: 'El agente de usuario debe ser una cadena de texto'
    }),
    role_user: zod.string({
        required_error: 'El rol es requerido',
        invalid_type_error: 'El rol debe ser una cadena de texto'
    }).refine(value => {
        const validRoles = ['admin', 'user']
        return validRoles.includes(value);
    }),
    street_address: zod.string({
        required_error: 'La dirección es requerida',
        invalid_type_error: 'La dirección debe ser una cadena de texto'
    }),
    city_address: zod.string({
        required_error: 'La ciudad es requerida',
        invalid_type_error: 'La ciudad debe ser una cadena de texto'
    }),
    state_address: zod.string({
        required_error: 'El estado es requerido',
        invalid_type_error: 'El estado debe ser una cadena de texto'
    }),
    state_code_address: zod.string({
        required_error: 'El código de estado es requerido',
        invalid_type_error: 'El código de estado debe ser una cadena de texto'
    }).refine(value => {
        const regex = /^[A-Z]{2}$/;
        return regex.test(value);
    }),
    postal_code_address: zod.string({
        required_error: 'El código postal es requerido',
        invalid_type_error: 'El código postal debe ser una cadena de texto'
    }),
    latitude_address: zod.number({
        required_error: 'La latitud es requerida',
        invalid_type_error: 'La latitud debe ser un número'
    }).refine(value => {
        return value >= -90 && value <= 90;
    }),
    longitude_address: zod.number({
        required_error: 'La longitud es requerido',
        invalid_type_error: 'La longitud debe ser un número'
    }).refine(value => {
        return value >= -180 && value <= 180;
    }),
    country_address: zod.string({
        required_error: 'El país es requerido',
        invalid_type_error: 'El país debe ser una cadena de texto'
    }),
    card_expire_user: zod.string({
        required_error: 'La fecha de expiración de la tarjeta es requerida',
        invalid_type_error: 'La fecha de expiración de la tarjeta debe ser una cadena de texto'
    }).refine(date => {
        const parseDate = new Date(date);
        return !isNaN(parseDate.getTime())
    }),
    card_number_user: zod.string({
        required_error: 'El número de tarjeta es requerido',
        invalid_type_error: 'El número de tarjeta debe ser una cadena de texto'
    }),
    card_type_user: zod.string({
        required_error: 'El tipo de tarjeta es requerido',
        invalid_type_error: 'El tipo de tarjeta debe ser una cadena de texto'
    }).refine(value => {
        const validTypes = ['Visa', 'MasterCard', 'American Express', 'Discover'];
        return validTypes.includes(value);
    }),
    currency_user: zod.string({
        required_error: 'La moneda es requerida',
        invalid_type_error: 'La moneda debe ser una cadena de texto'
    }).refine(value => {
        const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];
        return validCurrencies.includes(value);
    }),
    iban_user: zod.string({
        required_error: 'El IBAN es requerido',
        invalid_type_error: 'El IBAN debe ser una cadena de texto'
    }).refine(value => {
        const regex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
        return regex.test(value);
    }),
    department_company_user: zod.string({
        required_error: 'El departamento de la empresa es requerido',
        invalid_type_error: 'El departamento de la empresa debe ser una cadena de texto'
    }),
    company_name_user: zod.string({
        required_error: 'El nombre de la empresa es requerido',
        invalid_type_error: 'El nombre de la empresa debe ser una cadena de texto'
    }),
    company_title_user: zod.string({
        required_error: 'El título de la empresa es requerido',
        invalid_type_error: 'El título de la empresa debe ser una cadena de texto'
    }),
    company_street_user: zod.string({
        required_error: 'La dirección de la empresa es requerida',
        invalid_type_error: 'La dirección de la empresa debe ser una cadena de texto'
    }),
    company_city_user: zod.string({
        required_error: 'La ciudad de la empresa es requerida',
        invalid_type_error: 'La ciudad de la empresa debe ser una cadena de texto'
    }),
    company_state_user: zod.string({
        required_error: 'El estado de la empresa es requerido',
        invalid_type_error: 'El estado de la empresa debe ser una cadena de texto'
    }),
    company_state_code_user: zod.string({
        required_error: 'El código de estado de la empresa es requerido',
        invalid_type_error: 'El código de estado de la empresa debe ser una cadena de texto'
    }).refine(value => {
        const regex = /^[A-Z]{2}$/;
        return regex.test(value);
    }),
    company_postal_code_user: zod.string({
        required_error: 'El código postal de la empresa es requerido',
        invalid_type_error: 'El código postal de la empresa debe ser una cadena de texto'
    }),
    company_latitude_user: zod.number({
        required_error: 'La latitud de la empresa es requerida',
        invalid_type_error: 'La latitud de la empresa debe ser un número'
    }).refine(value => {
        return value >= -90 && value <= 90;
    }),
    company_longitude_user: zod.number({
        required_error: 'La longitud de la empresa es requerida',
        invalid_type_error: 'La longitud de la empresa debe ser un número'
    }).refine(value => {
        return value >= -180 && value <= 180;
    }),
    company_country_user: zod.string({
        required_error: 'El país de la empresa es requerido',
        invalid_type_error: 'El país de la empresa debe ser una cadena de texto'
    }),
    coin_user: zod.string({
        required_error: "La moneda de bitcoin es requerida",
        invalid_type_error: "La moneda de bitcoin debe ser una cadena de texto"
    }),
    wallet_address_user: zod.string({
        required_error: "La dirección de la billetera es requerida",
        invalid_type_error: "La dirección de la billetera debe ser una cadena de texto"
    }).refine(value => {
        const regex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
        return regex.test(value);
    }),
    network_user: zod.string({
        required_error: "La red de bitcoin es requerida",
        invalid_type_error: "La red de bitcoin debe ser una cadena de texto"
    })

})


export const registerSchema = zod.object({
    username: zod.string({
        required_error: "El nombre de usuario es requerido.",
    })
    .min(3, {
        message: "El nombre de usuario debe tener al menos 3 caracteres.",
    })
    .max(30, {
        message: "El nombre de usuario no debe exceder los 30 caracteres.",
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
        message: "El nombre de usuario solo puede contener letras, números y guiones bajos.",
    }),

    email_user: zod.string({
        required_error: "El correo electrónico es requerido.",
    })
    .email({
        message: "El formato del correo electrónico no es válido.",
    }),

    password_user: zod.string({
        required_error: "La contraseña es requerida.",
    })
    .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres.",
    })
    .max(100, {
        message: "La contraseña no debe exceder los 100 caracteres.",
    }).optional(),
    role_user: zod.string({
        invalid_type_error: "El rol debe ser una cadena de texto"
    }).refine(value => {
        const validRoles = ['admin', 'user'];
        return validRoles.includes(value);
    }).optional()
    .default('user')
});


export const schemaLogin = zod.object({
    email_user: zod.string({
        required_error: 'El id de usuario es requerido',
        invalid_type_error: 'El id de usuario debe ser una cadena de texto'
    }).email('El email no es valido'),
    
    password_user: zod.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser una cadena de texto'
    }).min(8, 'La contraseña debe tener al menos 8 caracteres')
})


export function validateUser(user){
    return schemaUser.safeParse(user);
}

export function validateRegister(user){
    return registerSchema.safeParse(user);
}

export function validateUpdateUser(user){
    return schemaUserUpdate.partial().safeParse(user);
}

export function validateLogin(user){
    return schemaLogin.safeParse(user);
}