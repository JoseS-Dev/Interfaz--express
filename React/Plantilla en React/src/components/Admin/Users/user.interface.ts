export interface User {
    user_id: number;
    name_user: string;
    maiden_name_user: string;
    email_user: string;
    password_user: string;
    username: string;
    is_active_user: 0 | 1;  
    role_user: 'admin' | 'user';

    // Info user
    id_info_user: number;
    age_user: number;
    phone_user: string;
    birth_date_user: string; 
    image_user: string;
    blood_group_user: string;
    height_user: string;
    weight_user: string;
    eye_color_user: string;
    hair_user: string;
    ip_user: string;
    mac_address_user: string;
    university_user: string;
    ein_user: string;
    ssn_user: string;
    user_agent_user: string;

    // Address user
    id_address: number;
    street_address: string;
    city_address: string;
    state_address: string;
    state_code_address: string;
    postal_code_address: string;
    latitude_address: string; 
    longitude_address: string; 
    country_address: string;

    // Bank info user
    id_bank_info: number;
    card_expire_user: string;
    card_number_user: string;
    card_type_user: string;
    currency_user: string;
    iban_user: string;

    // Companies user
    id_company: number;
    department_company_user: string;
    company_name_user: string;
    company_title_user: string;
    company_street_user: string;
    company_city_user: string;
    company_state_user: string;
    company_state_code_user: string;
    company_postal_code_user: string;
    company_latitude_user: string;
    company_longitude_user: string;
    company_country_user: string;

    // Crypto wallets user
    id_crypto_wallet: number;
    coin_user: string;
    wallet_address_user: string;
    network_user: string;
}