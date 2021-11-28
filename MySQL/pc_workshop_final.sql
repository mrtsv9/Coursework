-- MySQL Script generated by MySQL Workbench
-- Fri Nov 19 16:29:12 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pc_workshop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pc_workshop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pc_workshop` DEFAULT CHARACTER SET utf8 ;
USE `pc_workshop` ;

-- -----------------------------------------------------
-- Table `pc_workshop`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`clients` (
  `client_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone_number` CHAR(13) NOT NULL,
  PRIMARY KEY (`client_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`delivery_methods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`delivery_methods` (
  `delivery_method_id` INT NOT NULL AUTO_INCREMENT,
  `delivery_type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`delivery_method_id`),
  UNIQUE INDEX `delivery_type_UNIQUE` (`delivery_type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`payment_methods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`payment_methods` (
  `payment_method_id` INT NOT NULL AUTO_INCREMENT,
  `payment_type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`payment_method_id`),
  UNIQUE INDEX `payment_type_UNIQUE` (`payment_type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(45) NULL,
  `client_id` INT NOT NULL,
  `delivery_method_id` INT NOT NULL,
  `payment_method_id` INT NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_orders_clients_idx` (`client_id` ASC) VISIBLE,
  INDEX `fk_orders_delivery_methods1_idx` (`delivery_method_id` ASC) VISIBLE,
  INDEX `fk_orders_payment_methods1_idx` (`payment_method_id` ASC) VISIBLE,
  CONSTRAINT `fk_orders_clients`
    FOREIGN KEY (`client_id`)
    REFERENCES `pc_workshop`.`clients` (`client_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_delivery_methods1`
    FOREIGN KEY (`delivery_method_id`)
    REFERENCES `pc_workshop`.`delivery_methods` (`delivery_method_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_payment_methods1`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `pc_workshop`.`payment_methods` (`payment_method_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`assembly_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`assembly_types` (
  `assembly_type_id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`assembly_type_id`),
  UNIQUE INDEX `type_UNIQUE` (`type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`positions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`positions` (
  `position_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`position_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`employees` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `middle_name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `phone_number` CHAR(13) NULL,
  `email` VARCHAR(45) NULL,
  `position_id` INT,
  PRIMARY KEY (`employee_id`),
  INDEX `fk_employees_positions1_idx` (`position_id` ASC) VISIBLE,
  CONSTRAINT `fk_employees_positions1`
    FOREIGN KEY (`position_id`)
    REFERENCES `pc_workshop`.`positions` (`position_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`pc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`pc` (
  `pc_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `assembly_type_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  PRIMARY KEY (`pc_id`),
  INDEX `fk_pc_orders1_idx` (`order_id` ASC) VISIBLE,
  INDEX `fk_pc_assembly_types1_idx` (`assembly_type_id` ASC) VISIBLE,
  INDEX `fk_pc_employees1_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_pc_orders1`
    FOREIGN KEY (`order_id`)
    REFERENCES `pc_workshop`.`orders` (`order_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_assembly_types1`
    FOREIGN KEY (`assembly_type_id`)
    REFERENCES `pc_workshop`.`assembly_types` (`assembly_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_employees1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `pc_workshop`.`employees` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`types_of_accessories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`types_of_accessories` (
  `type_of_accessory_id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`type_of_accessory_id`),
  UNIQUE INDEX `type_UNIQUE` (`type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`accessories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`accessories` (
  `accessory_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `properties` VARCHAR(45) NOT NULL,
  `type_of_accessory_id` INT NOT NULL,
  PRIMARY KEY (`accessory_id`),
  INDEX `fk_accessories_types_of_accessories1_idx` (`type_of_accessory_id` ASC) VISIBLE,
  CONSTRAINT `fk_accessories_types_of_accessories1`
    FOREIGN KEY (`type_of_accessory_id`)
    REFERENCES `pc_workshop`.`types_of_accessories` (`type_of_accessory_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`pc_accessories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`pc_accessories` (
  `pc_id` INT NOT NULL,
  `accessory_id` INT NOT NULL,
  PRIMARY KEY (`pc_id`, `accessory_id`),
  INDEX `fk_pc_has_accessories_accessories1_idx` (`accessory_id` ASC) VISIBLE,
  INDEX `fk_pc_has_accessories_pc1_idx` (`pc_id` ASC) VISIBLE,
  CONSTRAINT `fk_pc_has_accessories_pc1`
    FOREIGN KEY (`pc_id`)
    REFERENCES `pc_workshop`.`pc` (`pc_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_has_accessories_accessories1`
    FOREIGN KEY (`accessory_id`)
    REFERENCES `pc_workshop`.`accessories` (`accessory_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
