CREATE TABLE user_register(
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    name_user VARCHAR(255) NOT NULL,
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