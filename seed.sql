DROP DATABASE IF EXISTS workforce_db;

CREATE DATABASE workforce_db;

USE workforce_db;

CREATE TABLE departments (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(30)
)

CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT
)

CREATE TABLE employee (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT UNA
)

INSERT INTO roles (title, salary)

