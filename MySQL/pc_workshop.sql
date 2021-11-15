-- MySQL Script generated by MySQL Workbench
-- Sun Nov 14 04:30:21 2021
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
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phone_number` CHAR(13) NULL,
  PRIMARY KEY (`client_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`payment_methods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`payment_methods` (
  `payment_methods_id` INT NOT NULL AUTO_INCREMENT,
  `payment_type` VARCHAR(45) NULL,
  PRIMARY KEY (`payment_methods_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`delivery_methods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`delivery_methods` (
  `delivery_methods_id` INT NOT NULL AUTO_INCREMENT,
  `delivery_type` VARCHAR(45) NULL,
  PRIMARY KEY (`delivery_methods_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(45) NULL,
  `clients_client_id` INT NOT NULL,
  `payment_methods_id` INT NOT NULL,
  `delivery_methods_id` INT NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_orders_clients_idx` (`clients_client_id` ASC) VISIBLE,
  INDEX `fk_orders_payment_methods1_idx` (`payment_methods_id` ASC) VISIBLE,
  INDEX `fk_orders_delivery_methods1_idx` (`delivery_methods_id` ASC) VISIBLE,
  CONSTRAINT `fk_orders_clients`
    FOREIGN KEY (`clients_client_id`)
    REFERENCES `pc_workshop`.`clients` (`client_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_payment_methods1`
    FOREIGN KEY (`payment_methods_id`)
    REFERENCES `pc_workshop`.`payment_methods` (`payment_methods_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_delivery_methods1`
    FOREIGN KEY (`delivery_methods_id`)
    REFERENCES `pc_workshop`.`delivery_methods` (`delivery_methods_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`positions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`positions` (
  `positions_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`positions_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`employees` (
  `employees_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `middle_name` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `phone_number` CHAR(13) NULL,
  `email` VARCHAR(45) NULL,
  `positions_positions_id` INT NOT NULL,
  PRIMARY KEY (`employees_id`),
  INDEX `fk_employees_positions1_idx` (`positions_positions_id` ASC) VISIBLE,
  CONSTRAINT `fk_employees_positions1`
    FOREIGN KEY (`positions_positions_id`)
    REFERENCES `pc_workshop`.`positions` (`positions_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`assemblies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`assemblies` (
  `assembly_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`assembly_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`pc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`pc` (
  `pc_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `employees_id` INT NOT NULL,
  `assembly_id` INT NULL,
  PRIMARY KEY (`pc_id`),
  INDEX `fk_pc_orders1_idx` (`order_id` ASC) VISIBLE,
  INDEX `fk_pc_employees1_idx` (`employees_id` ASC) VISIBLE,
  INDEX `fk_pc_assemblies1_idx` (`assembly_id` ASC) VISIBLE,
  CONSTRAINT `fk_pc_orders1`
    FOREIGN KEY (`order_id`)
    REFERENCES `pc_workshop`.`orders` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_employees1`
    FOREIGN KEY (`employees_id`)
    REFERENCES `pc_workshop`.`employees` (`employees_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_assemblies1`
    FOREIGN KEY (`assembly_id`)
    REFERENCES `pc_workshop`.`assemblies` (`assembly_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`types_of_accessories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`types_of_accessories` (
  `types_of_accessories_id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`types_of_accessories_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`accessories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`accessories` (
  `accessories_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `properties` VARCHAR(45) NULL,
  `types_of_accessories_id` INT NOT NULL,
  PRIMARY KEY (`accessories_id`),
  INDEX `fk_accessories_types_of_accessories1_idx` (`types_of_accessories_id` ASC) VISIBLE,
  CONSTRAINT `fk_accessories_types_of_accessories1`
    FOREIGN KEY (`types_of_accessories_id`)
    REFERENCES `pc_workshop`.`types_of_accessories` (`types_of_accessories_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`assembly_accessories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`assembly_accessories` (
  `assembly_accessories_id` INT NOT NULL AUTO_INCREMENT,
  `assembly_id` INT NOT NULL,
  `accessories_id` INT NOT NULL,
  PRIMARY KEY (`assembly_accessories_id`),
  INDEX `fk_assembly_accessories_assemblies1_idx` (`assembly_id` ASC) VISIBLE,
  INDEX `fk_assembly_accessories_accessories1_idx` (`accessories_id` ASC) VISIBLE,
  CONSTRAINT `fk_assembly_accessories_assemblies1`
    FOREIGN KEY (`assembly_id`)
    REFERENCES `pc_workshop`.`assemblies` (`assembly_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_assembly_accessories_accessories1`
    FOREIGN KEY (`accessories_id`)
    REFERENCES `pc_workshop`.`accessories` (`accessories_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc_workshop`.`pc_accessories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc_workshop`.`pc_accessories` (
  `pc_accessories_id` INT NOT NULL AUTO_INCREMENT,
  `accessories_id` INT NOT NULL,
  `pc_id` INT NOT NULL,
  PRIMARY KEY (`pc_accessories_id`),
  INDEX `fk_pc_accessories_accessories1_idx` (`accessories_id` ASC) VISIBLE,
  INDEX `fk_pc_accessories_pc1_idx` (`pc_id` ASC) VISIBLE,
  CONSTRAINT `fk_pc_accessories_accessories1`
    FOREIGN KEY (`accessories_id`)
    REFERENCES `pc_workshop`.`accessories` (`accessories_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_accessories_pc1`
    FOREIGN KEY (`pc_id`)
    REFERENCES `pc_workshop`.`pc` (`pc_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
