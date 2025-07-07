export interface IUser {
    id_user: number;
    name_user: string;
    maiden_name_user: string;
    email_user: string;
    password_user: string; // Incluir si el backend lo devuelve, pero manejar con cuidado en el frontend (ej. no mostrarlo/pedirlo explícitamente en la edición)
    username: string;
    is_active_user: 0 | 1; // o boolean si lo conviertes en el frontend
    role_user: string;

    // Información General / Personal
    id_info_user: number; // ID de la tabla de información general/personal
    age_user: number | null;
    phone_user: string | null;
    birth_date_user: string | null; // ISO 8601 string, ej: "YYYY-MM-DDTHH:mm:ss.sssZ"
    image_user: string | null; // Data URL (base64) o URL de imagen
    gender_user: string | null;

    // Datos Médicos
    blood_group_user: string | null;
    height_user: number | null;
    weight_user: number | null;
    eye_color_user: string | null;
    hair_user: string | null;

    // Datos de Sistema (usualmente no editables por el usuario final, pero pueden ser parte del perfil)
    ip_user: string | null;
    mac_address_user: string | null;
    user_agent_user: string | null;

    // Datos Profesionales / Identificación
    university_user: string | null;
    ein_user: string | null; // Employer Identification Number
    ssn_user: string | null; // Social Security Number

    // Dirección Residencial
    id_address: number; // ID de la tabla de dirección
    street_address: string | null;
    city_address: string | null;
    state_address: string | null;
    state_code_address: string | null;
    postal_code_address: string | null;
    latitude_address: number | null;
    longitude_address: number | null;
    country_address: string | null;

    // Información Bancaria / Financiera
    id_bank_info: number; // ID de la tabla de información bancaria
    card_expire_user: string | null; // Formato "YYYY-MM-DD" o "YYYY-MM"
    card_number_user: string | null;
    card_type_user: string | null;
    currency_user: string | null;
    iban_user: string | null;

    // Información de la Empresa
    id_company: number; // ID de la tabla de empresa
    department_company_user: string | null;
    company_name_user: string | null;
    company_title_user: string | null;
    company_street_user: string | null;
    company_city_user: string | null;
    company_state_user: string | null;
    company_state_code_user: string | null;
    company_postal_code_user: string | null;
    company_latitude_user: number | null;
    company_longitude_user: number | null;
    company_country_user: string | null;

    // Cripto Monedas / Wallet
    id_crypto_wallet: number; // ID de la tabla de crypto wallet
    coin_user: string | null;
    wallet_address_user: string | null;
    network_user: string | null;
}