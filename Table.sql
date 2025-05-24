CREATE DATABASE IF NOT EXISTS users;
USE users;

CREATE TABLE login_user(
    id_login INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES user_register(id_user),
)

CREATE TABLE user_register(
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    name_user VARCHAR(255) NOT NULL,
    email_user VARCHAR(255) NOT NULL,
    password_user VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
)