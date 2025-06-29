export interface IUser {
    user_id: number;
    name_user: string;
    maiden_name_user: string;
    email_user: string;
    username: string;
    role_user: 'admin' | 'user'; 
    is_active_user: 0 | 1; 

    // Información Personal
    age_user: number;
    birth_date_user: string; // O Date, si lo parseas
    phone_user: string;
    eye_color_user: string;
    hair_user: string;
    blood_group_user: string;
    height_user: number;
    weight_user: number;

    // Dirección
    street_address: string;
    city_address: string;
    state_address: string;
    state_code_address: string;
    postal_code_address: string;
    country_address: string;
    latitude_address: string; // Se almacenan como string y se parsean a float
    longitude_address: string; // Se almacenan como string y se parsean a float
    ip_user: string;
    mac_address_user: string;

    // Información Académica
    university_user: string;
    user_agent_user: string;

    // Información Financiera
    card_type_user: string;
    card_number_user: string;
    card_expire_user: string;
    currency_user: string;
    iban_user: string;

    // Información de la Empresa
    company_name_user: string;
    department_company_user: string;
    company_title_user: string;
    company_street_user: string;
    company_city_user: string;
    company_state_user: string;
    company_state_code_user: string;
    company_postal_code_user: string;
    company_country_user: string;
    company_latitude_user: string; // Se almacenan como string y se parsean a float
    company_longitude_user: string; // Se almacenan como string y se parsean a float

    // Cripto Wallet 
    coin_user: string;
    wallet_address_user: string;
    network_user: string;
}