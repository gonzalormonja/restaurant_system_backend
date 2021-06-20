/*create schema restaurant_system;
 
 create user 'restaurant'@'localhost' IDENTIFIED BY 'password'
 
 GRANT ALL ON *.* TO 'restaurant'@'localhost';*/
DROP TABLE if exists products_characteristics;

DROP TABLE if exists products_garnishes;

DROP TABLE if exists products_ingredients;

DROP TABLE if exists products_times_of_day;

DROP TABLE if exists times_of_day;

DROP TABLE if exists characteristics;

DROP TABLE if exists ingredients;

DROP TABLE if exists prices;

DROP TABLE if exists products;

DROP TABLE if exists categories;

DROP TABLE if exists users;

DROP TABLE if exists types;

DROP TABLE if exists customers;

create table customers(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name varchar(255),
	phone varchar(255),
	email varchar(255),
	createdAt datetime,
	updatedAt datetime
);

create table types(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) not null,
	idCustomer INT NOT NULL,
	createdAt datetime,
	updatedAt datetime,
	FOREIGN KEY(idCustomer) REFERENCES customers(id)
);

CREATE TABLE users(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	phone VARCHAR(255),
	email VARCHAR(255),
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	idCustomer int not null,
	idType INT NOT NULL,
	createdAt datetime,
	updatedAt datetime,
	FOREIGN KEY(idCustomer) REFERENCES customers(id),
	FOREIGN KEY(idType) REFERENCES types(id)
);

create table categories(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	state BOOLEAN DEFAULT TRUE,
	idCustomer INT NOT NULL,
	idCategory INT DEFAULT NULL,
	createdAt datetime,
	updatedAt datetime,
	FOREIGN KEY(idCustomer) REFERENCES customers(id)
);

create table times_of_day(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name varchar(255),
	hour_start TIME NOT NULL,
	hour_end TIME NOT NULL,
	idCustomer INT NOT NULL,
	createdAt datetime,
	updatedAt datetime,
	FOREIGN KEY(idCustomer) REFERENCES customers(id)
);

create table products(
	id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name varchar(255),
	bar_code varchar(255),
	short_name varchar(255),
	idCategory int,
	maximum_of_flavors int default null,
	state boolean default true,
	isGarnish boolean default false,
	approximate_delay_minutes int default null,
	idCustomer INT NOT NULL,
	createdAt datetime,
	updatedAt datetime,
	FOREIGN KEY(idCategory) REFERENCES categories(id),
	FOREIGN KEY(idCustomer) REFERENCES customers(id)
);

create table products_times_of_day(
	id INT PRIMARY KEY AUTO_INCREMENT,
	idProduct INT NOT NULL,
	idTimeOfDay INT NOT NULL,
	createdAt datetime,
	updatedAt datetime,
	FOREIGN KEY(idProduct) REFERENCES products(id),
	FOREIGN KEY(idTimeOfDay) REFERENCES times_of_day(id)
);

CREATE TABLE products_garnishes(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	idProduct INT NOT NULL,
	idGarnish INT NOT NULL,
	max_quantity INT NOT NULL,
	createdAt datetime,
	updatedAt datetime,
	FOREIGN KEY(idProduct) REFERENCES products(id),
	FOREIGN KEY(idGarnish) REFERENCES products(id)
);

CREATE TABLE prices(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	price float NOT NULL,
	idProduct INT NOT NULL,
	createdAt datetime,
	updatedAt datetime,
	FOREIGN KEY(idProduct) REFERENCES products(id)
);

CREATE TABLE ingredients(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	unit_of_measure varchar(255) NOT NULL,
	idCustomer INT NOT NULL,
	createdAt datetime,
	updatedAt datetime,
	FOREIGN KEY(idCustomer) REFERENCES customers(id)
);

CREATE TABLE products_ingredients(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	quantity FLOAT NOT NULL,
	idProduct INT NOT NULL,
	idIngredient INT NOT NULL,
	createdAt datetime,
	updatedAt datetime,
	FOREIGN KEY(idProduct) REFERENCES products(id),
	FOREIGN KEY(idIngredient) REFERENCES ingredients(id)
);

CREATE TABLE characteristics(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	idCustomer INT NOT NULL,
	createdAt datetime,
	updatedAt datetime,
	FOREIGN KEY(idCustomer) REFERENCES customers(id)
);

CREATE TABLE products_characteristics(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	idProduct INT NOT NULL,
	idCharacteristic INT NOT NULL,
	createdAt datetime,
	updatedAt datetime,
	FOREIGN KEY(idProduct) REFERENCES products(id),
	FOREIGN KEY(idCharacteristic) REFERENCES characteristics(id)
);

INSERT INTO
	customers(name)
values
	('Restaurante pepito');

INSERT INTO
	types(name, idCustomer)
values
	('administrator', 1);

INSERT INTO
	users(name, username, password, idCustomer, idType)
values
	(
		'Pedro',
		'admin',
		'$2b$10$Ed0/UB1wtpKmEEiBphiNUuKRguvUPsLe4ch7OUTG5A7tGhM1677CO',
		1,
		1
	);