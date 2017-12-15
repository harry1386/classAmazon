DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(255) NULL,
	department_name VARCHAR(255) NULL,
	price DECIMAL(10,2) NULL,
	stock_quantity INT NULL,
	PRIMARY KEY(item_id)
);

INSERT INTO
	products(product_name, department_name, price, stock_quantity)
	VALUES ("Saga Vol 1-3", "comics", "14.99", "15");

INSERT INTO
	products(product_name, department_name, price, stock_quantity)
	VALUES ("Saga Vol 4-6", "comics", "14.99", "10");

INSERT INTO
	products(product_name, department_name, price, stock_quantity)
	VALUES ("Saga Vol 7-8", "comics", "14.99", "4");

INSERT INTO
	products(product_name, department_name, price, stock_quantity)
	VALUES ("Destiny 2", "games", "59.99", "20");

INSERT INTO
	products(product_name, department_name, price, stock_quantity)
	VALUES ("Starcraft 2", "games", "39.99", "17");

INSERT INTO
	products(product_name, department_name, price, stock_quantity)
	VALUES ("Mario Cart SNES", "games", "49.99", "3");

INSERT INTO
	products(product_name, department_name, price, stock_quantity)
	VALUES ("Pokemon Red", "games", "29.99", "14");

INSERT INTO
	products(product_name, department_name, price, stock_quantity)
	VALUES ("Cabin Tent", "outdoors", "79.99", "25");

INSERT INTO
	products(product_name, department_name, price, stock_quantity)
	VALUES ("Insulated Sleeping Bag", "outdoors", "39.99", "20");

INSERT INTO
	products(product_name, department_name, price, stock_quantity)
	VALUES ("Campfire Stove", "outdoors", "19.99", "10");

INSERT INTO
	products(product_name, department_name, price, stock_quantity)
	VALUES ("Camp Chair", "outdoors", "9.99", "4");