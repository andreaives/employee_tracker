DROP DATABASE IF EXISTS workforce_db;

CREATE DATABASE workforce_db;

USE workforce_db;

CREATE TABLE departments (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT
);

CREATE TABLE employees (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
department_id INT
);
INSERT INTO departments (name)
VALUE ("Accounting"), ("Contractors"), ("Legal"), ("Sales"), ("C Suite");

INSERT INTO roles (title, salary, department_id)
VALUE ("Accountant", 125000, 1), ("Contractor", 800, 2), ("CFO", 190000, 5), ("Legal Lead", 220000, 3), ("Sales Executive", 130000, 4);
 
INSERT INTO employees (first_name,last_name, role_id, department_id)
VALUE ("Elizabreth", "Bunt", 3, 3), ("Doug","Smolls", 5, 4), ("Chris", "Cow", 1, 1), ("Carrie", "Carrington", 4, 5);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.name
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON employees.department_id = departments.id;

SELECT departments.name, roles.title
FROM roles
LEFT JOIN departments ON roles.department_id= departments.id;

SELECT departments.name, roles.title, roles.salary
FROM roles
LEFT JOIN departments ON roles.department_id= departments.id;