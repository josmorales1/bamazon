DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;
USE bamazon_db;

CREATE TABLE products
(
    item_id INT(11) NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(20,2) NOT NULL,
    stock_quantity INT(11) NOT NULL,
    PRIMARY KEY (item_id)
);


SELECT *
FROM products;

INSERT INTO products
    (item_id, product_name, department_name, price, stock_quantity)
VALUES
    (1, "Flash Drives", "Electronics", 4.99, 20),
    (2, "Controller", "Electronics", 15.99, 10),
    (3, "Video Game", "Electronics", 59.99, 5),
    (4, "Iphone X", "Electronics", 1029.99, 14),
    (5, "PS4", "Electronics", 239.99, 5),
    (6, "keyboards", "Electronics", 19.99, 30),
    (7, "XBOXONE", "Electronics", 149.99, 14),
    (8, "Mouse", "Electronics", 9.99, 15),
    (9, "Samsung Tv", "Electronics", 199.99, 20),
    (10, "MacBook Air", "Electronics", 799.99, 10)