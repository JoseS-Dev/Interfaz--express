CREATE TABLE user_register(
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    name_user VARCHAR(255) NOT NULL,
    Last_name_user VARCHAR(255) NOT NULL,
    maiden_name_user VARCHAR(255) NOT NULL,
    age_user INT NOT NULL,
    phone_user VARCHAR(20) NOT NULL,
    image_user VARCHAR(255) NOT NULL,
    height_user DECIMAL(5,2) NOT NULL,
    weight_user DECIMAL(5,2) NOT NULL
    birth_date_user VARCHAR(255) NOT NULL,
    blood_type_user VARCHAR(50) NOT NULL,
    eye_color_user VARCHAR(50) NOT NULL,
    hair_color_user VARCHAR(50) NOT NULL,
    hair_type_user VARCHAR(50) NOT NULL,
    ip_address_user VARCHAR(255) NOT NULL,
    address_user VARCHAR(255) NOT NULL,
    city_user VARCHAR(255) NOT NULL,
    state_user VARCHAR(255) NOT NULL,
    address_stateCode_user VARCHAR(50) NOT NULL,
    address_postalCode_user VARCHAR(50) NOT NULL,
    address_coordinates_lat_user DECIMAL(10,8) NOT NULL,
    address_coordinates_lng_user DECIMAL(11,8) NOT NULL,
    address_country_user VARCHAR(255) NOT NULL,
    mac_address_user VARCHAR(255) NOT NULL,
    university_user VARCHAR(255) NOT NULL,
    bank_cardExpires_user VARCHAR(50) NOT NULL,
    bank_cardNumber_user VARCHAR(50) NOT NULL,
    bank_cardType_user VARCHAR(50) NOT NULL,
    bank_currency_user VARCHAR(50) NOT NULL,
    bank_iban_user VARCHAR(50) NOT NULL,
    company_department_user VARCHAR(255) NOT NULL,
    company_name_user VARCHAR(255) NOT NULL,
    company_title_user VARCHAR(255) NOT NULL,
    company_address_user VARCHAR(255) NOT NULL,
    company_address_city_user VARCHAR(255) NOT NULL,
    company_address_state_user VARCHAR(255) NOT NULL,
    company_address_stateCode_user VARCHAR(50) NOT NULL,
    company_address_postalCode_user VARCHAR(50) NOT NULL,
    company_address_coordinates_lat_user DECIMAL(10,8) NOT NULL,
    company_address_coordinates_lng_user DECIMAL(11,8) NOT NULL,
    company_address_country_user VARCHAR(255) NOT NULL,
    ein_user VARCHAR(255) NOT NULL,
    ssn_user VARCHAR(255) NOT NULL,
    userAgent_user VARCHAR(255) NOT NULL,
    crypto_coin_user VARCHAR(255) NOT NULL,
    crypto_wallet_user VARCHAR(255) NOT NULL,
    crypton_network_user VARCHAR(255) NOT NULL,
    role_user VARCHAR(50) NOT NULL,
    email_user VARCHAR(255) NOT NULL,
    password_user VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL
);

CREATE TABLE login_user(
    id_login INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES user_register(id_user)
);

CREATE TABLE colors(
    id_colors INT PRIMARY KEY AUTO_INCREMENT,
    primary_color VARCHAR(200) NOT NULL,
    secondary_color VARCHAR(200) NOT NULL,
    ternary_color VARCHAR(200) NOT NULL,
    cuarternary_color VARCHAR(200) NOT NULL,
    neutral_color VARCHAR(200) NOT NULL,
    is_selected BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE colors_relationship(
    id_relation INT PRIMARY KEY AUTO_INCREMENT,
    id_colors INT,
    id_user INT,
    FOREIGN KEY(id_colors) REFERENCES colors(id_colors),
    FOREIGN KEY(id_user) REFERENCES user_register(id_user)
);

CREATE TABLE typography(
    id_tipography INT PRIMARY KEY AUTO_INCREMENT,
    name_tipography_main VARCHAR(255) NOT NULL,
    name_tipography_secondary VARCHAR(255) NOT NULL,
    -- tam_font INT NOT NULL,
    tam_paragraph INT NOT NULL,
    tam_title INT NOT NULL,
    tam_subtitle INT NOT NULL,
    is_selected BOOLEAN NOT NULL DEFAULT FALSE,
    archive_font_main VARCHAR(255) NOT NULL,
    archive_font_secondary VARCHAR(255) NOT NULL
);

CREATE TABLE typography_relationship(
    id_relation INT PRIMARY KEY AUTO_INCREMENT,
    id_tipography INT,
    id_user INT,
    FOREIGN KEY(id_tipography) REFERENCES typography(id_tipography),
    FOREIGN KEY(id_user) REFERENCES user_register(id_user)
);