export interface User {
  id_user: number;
  name_user: string;
  maiden_name_user: string;
  email_user: string;
  password_user: string;
  username: string;
  role_user: string;
}

export interface UserProfile {
  id_user: number;
  name_user: string;
  maiden_name_user: string;
  email_user: string;
  password_user: string;
  username: string;
  role_user: string;
  age_user: number | null;
  phone_user: string | null;
  birth_date_user: string | null;
  image_user: string | null;
  blood_group_user: string | null;
  height_user: number | null;
  weight_user: number | null;
  eye_color_user: string | null;
  hair_user: string | null;
  ip_user: string | null;
  mac_address_user: string | null;
  university_user: string | null;
  ein_user: string | null;
  ssn_user: string | null;
  user_agent_user: string | null;
  street_address: string | null;
  city_address: string | null;
  state_address: string | null;
  state_code_address: string | null;
  postal_code_address: string | null;
  latitude_address: number | null;
  longitude_address: number | null;
  country_address: string | null;
  card_expire_user: string | null;
  card_number_user: string | null;
  card_type_user: string | null;
  currency_user: string | null;
  iban_user: string | null;
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
  coin_user: string | null;
  wallet_address_user: string | null;
  network_user: string | null;
}

export interface LocationData {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
} 