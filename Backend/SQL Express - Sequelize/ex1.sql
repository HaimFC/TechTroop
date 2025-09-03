CREATE DATABASE sql_pokemon;
USE sql_pokemon;

CREATE TABLE pokemon_type(
    type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    p_type varchar(20)
);

CREATE TABLE town(
    town_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    town_name varchar(20)
);


CREATE TABLE trainer(
    trainer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(20),
    town_id INT
);

CREATE TABLE pokemon(
    pokemon_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(20),
    type INT,
    height INT,
    weight INT,
    ownedBy INT
);

CREATE TABLE pokemon_trainer (
    pair_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    trainer_id INT NOT NULL,
    pokemon_id INT NOT NULL,
    FOREIGN KEY (trainer_id) REFERENCES trainer(trainer_id),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(pokemon_id)
);


