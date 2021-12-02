USE pc_workshop;
CREATE VIEW `client`
AS SELECT * FROM orders WHERE client_id = 1;
SELECT * FROM `client`;

CALL fetch_clients();

USE pc_workshop;


CREATE TRIGGER setPrice BEFORE INSERT ON accessories
FOR EACH ROW SET NEW.price = NEW.price + 100;
INSERT INTO accessories (`name`, properties, price , type_of_accessory_id) 
	VALUES("1660 super", "very good", 20 , 2);
SELECT * FROM accessories;

START TRANSACTION;
INSERT INTO positions (`name`) 
	VALUES("admin"), ("ne admin");
UPDATE positions SET `name` = "user" WHERE `name` = "ne admin";
SELECT * FROM positions;
COMMIT;

CREATE ROLE "admin";
GRANT ALL ON pc_workshop.* TO "admin";
CREATE USER "admin1"@"localhost";
SHOW GRANTS FOR "admin1"@"localhost";

CREATE ROLE "userrr";
GRANT SELECT ON pc_workshop.* TO "userrr";
CREATE USER "userrr1"@"localhost"  IDENTIFIED BY "readeruser";
GRANT "userrr" TO "userrr1"@"localhost";
SHOW GRANTS FOR "userrr1"@"localhost";

INSERT INTO clients (first_name, last_name, email, phone_number, `password`) 
		VALUES(md5("Максим"), "Сущиков", "mail1", "123", "pass1");
SELECT * FROM clients;

