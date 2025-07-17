drop database if exists users;
create database users;
use users;
CREATE TABLE user_register(
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    name_user VARCHAR(255) NOT NULL DEFAULT '',
    maiden_name_user VARCHAR(255) NOT NULL DEFAULT '',
    email_user VARCHAR(255) NOT NULL,
    password_user VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    is_active_user BOOLEAN NOT NULL DEFAULT TRUE,
    role_user ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

CREATE TABLE info_user(
    id_info_user INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    age_user INT NOT NULL,
    phone_user VARCHAR(255) NOT NULL,
    birth_date_user DATE NOT NULL,
    image_user LONGTEXT NOT NULL,
    blood_group_user VARCHAR(10) NOT NULL,
    height_user DECIMAL(5,2) NOT NULL,
    weight_user DECIMAL(5,2) NOT NULL,
    eye_color_user VARCHAR(50) NOT NULL,
    hair_user VARCHAR(50) NOT NULL,
    ip_user VARCHAR(45) NOT NULL,
    mac_address_user VARCHAR(17) NOT NULL,
    university_user VARCHAR(255) NOT NULL,
    ein_user VARCHAR(255) NOT NULL,
    ssn_user VARCHAR(255) NOT NULL,
    user_agent_user VARCHAR(255) NOT NULL,
    gender_user VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user_register(id_user)
);

CREATE TABLE address_user(
    id_address INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    street_address VARCHAR(255) NOT NULL,
    city_address VARCHAR(100) NOT NULL,
    state_address VARCHAR(100) NOT NULL,
    state_code_address VARCHAR(10) NOT NULL,
    postal_code_address VARCHAR(20) NOT NULL,
    latitude_address DECIMAL(10,8) NOT NULL,
    longitude_address DECIMAL(11,8) NOT NULL,
    country_address VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user_register(id_user)
);

CREATE TABLE bank_info_user(
    id_bank_info INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    card_expire_user VARCHAR(10) NOT NULL,
    card_number_user VARCHAR(20) NOT NULL,
    card_type_user VARCHAR(25) NOT NULL,
    currency_user VARCHAR(10) NOT NULL,
    iban_user VARCHAR(34) NOT NULL
);

CREATE TABLE companies_user(
    id_company INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    department_company_user VARCHAR(100) NOT NULL,
    company_name_user VARCHAR(255) NOT NULL,
    company_title_user VARCHAR(100) NOT NULL,
    company_street_user VARCHAR(255) NOT NULL,
    company_city_user VARCHAR(100) NOT NULL,
    company_state_user VARCHAR(100) NOT NULL,
    company_state_code_user VARCHAR(10) NOT NULL,
    company_postal_code_user VARCHAR(20) NOT NULL,
    company_latitude_user DECIMAL(10,8) NOT NULL,
    company_longitude_user DECIMAL(11,8) NOT NULL,
    company_country_user VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user_register(id_user)
);

CREATE TABLE crypto_wallets_user(
    id_crypto_wallet INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    coin_user VARCHAR(255) NOT NULL,
    wallet_address_user VARCHAR(255) NOT NULL,
    network_user VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user_register(id_user)
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

CREATE TABLE images(
    id_image INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    name_image VARCHAR(255) NOT NULL,
    format_image VARCHAR(50) NOT NULL,
    size_image BIGINT NOT NULL,
    dimension_image VARCHAR(50) NOT NULL,
    url_image LONGTEXT NOT NULL,
    is_selected BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_user) REFERENCES user_register(id_user)
);

CREATE TABLE videos(
    id_video INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    name_video VARCHAR(255) NOT NULL,
    format_video VARCHAR(50) NOT NULL,
    duration_video INT NOT NULL,
    audio_track_main_video VARCHAR(255) NOT NULL,
    audio_track_secondary_video VARCHAR(255) NOT NULL,
    subtitle_main_video VARCHAR(255) NOT NULL,
    subtitle_secondary_video VARCHAR(255) NOT NULL,
    url_video LONGTEXT NOT NULL,
    is_selected BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_user) REFERENCES user_register(id_user)
);