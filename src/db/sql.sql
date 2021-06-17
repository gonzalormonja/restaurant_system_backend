/*create schema restaurant_system;

create user 'restaurant'@'localhost' IDENTIFIED BY 'password'

GRANT ALL ON *.* TO 'restaurant'@'localhost';*/


DROP TABLE if exists menus_characteristics;
DROP TABLE if exists menus_garnishes;
DROP TABLE if exists menus_ingredients;
DROP TABLE if exists characteristics;
DROP TABLE if exists ingredients;
DROP TABLE if exists prices;
DROP TABLE if exists menus;
DROP TABLE if exists categories;
DROP TABLE if exists customers;

create table customers(id INT PRIMARY KEY AUTO_INCREMENT,
name varchar(255) not null,
phone varchar(255) not null,
email varchar(255) not null,
createdAt timestamp,
updatedAt timestamp );

create table types(id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) not null,
idCustomer INT NOT NULL,
createdAt timestamp,
updatedAt timestamp,
FOREIGN KEY(idCustomer)REFERENCES customers(id) );

CREATE TABLE users(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
phone VARCHAR(255),
email VARCHAR(255),
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
idCustomer int not null,
idType INT NOT NULL,
createdAt timestamp,
updatedAt timestamp,
FOREIGN KEY(idCustomer)REFERENCES customers(id),
FOREIGN KEY(idType)REFERENCES types(id)
);

create table categories( id INT PRIMARY KEY AUTO_INCREMENT,
name varchar(255) NOT NULL,
state BOOLEAN DEFAULT TRUE,
createdAt timestamp,
updatedAt timestamp,
idCategory INT DEFAULT NULL);

create table menus( id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
name varchar(255),
bar_code varchar(255),
short_name varchar(255),
idCategory int,
maximum_of_flavors int default null,
state boolean default true,
isGarnish boolean default false,
createdAt timestamp,
updatedAt timestamp,
FOREIGN KEY(idCategory) REFERENCES categories(id)
);

CREATE TABLE menus_garnishes(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
idMenu INT NOT NULL,
idGarnish INT NOT NULL,
max_quantity INT NOT NULL,
createdAt timestamp,
updatedAt timestamp,
FOREIGN KEY(idMenu) REFERENCES menus(id),
FOREIGN KEY(idGarnish) REFERENCES menus(id)
);

CREATE TABLE prices(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
price float NOT NULL,
idMenu INT NOT NULL,
createdAt timestamp,
updatedAt timestamp,
FOREIGN KEY(idMenu) REFERENCES menus(id));

CREATE TABLE ingredients(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL,
unit_of_measure varchar(255) NOT NULL,
createdAt timestamp,
updatedAt timestamp
);

CREATE TABLE menus_ingredients(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
quantity FLOAT NOT NULL,
idMenu INT NOT NULL,
idIngredient INT NOT NULL,
createdAt timestamp,
updatedAt timestamp,
FOREIGN KEY(idMenu) REFERENCES menus(id),
FOREIGN KEY(idIngredient) REFERENCES ingredients(id)
);

CREATE TABLE characteristics(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
createdAt timestamp,
updatedAt timestamp);

CREATE TABLE menus_characteristics(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
idMenu INT NOT NULL,
idCharacteristic INT NOT NULL,
createdAt timestamp,
updatedAt timestamp,
FOREIGN KEY(idMenu) REFERENCES menus(id),
FOREIGN KEY(idCharacteristic) REFERENCES characteristics(id) );


