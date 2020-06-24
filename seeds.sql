USE businessDB;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null), 
("Jane", "Deer", 2, null);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 50,000.00, 1);

INSERT INTO department (name)
VALUES ("Finance & Accounting");