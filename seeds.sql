USE businessDB;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Deer", 1, 4), 
("Jane", "Doe", 2, 4),
("Toby", "Flenderson", 9, null),
("Charles", "Leman", 3, null),
("Mark", "Twain", 2, 4),
("Joe", "Fraiser", 1, 4),
("Alex", "Martinez", 1, 4),
("Booker", "Green", 7, 12),
("Omar", "Wijesinghe", 2, 4),
("Cameron", "Smith", 7, 12),
("Mary", "Lee", 7, 12),
("Suki", "Yamamoto", 8, null),
("Trent", "Delier", 6, 16),
("Harry", "Potter", 6, 16),
("Kermit", "Frog", 5, 17),
("Amy", "Williams", 4, null),
("David", "Varela", 4, null),
("Casey", "Jin", 5, 17);



INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 50000.00, 1),               
("Senior Accountant", 80000.00, 1),              
("Chief Finance Officer", 150000.00, 1),          
("Brand Manager", 62000.00, 2),                  
("Social Media Analyst", 40000.00, 2),           
("Marketing Associate", 45000.00, 2),             
("Legal Analyst", 95000.00, 3),                     
("Chief Legal Officer", 130000.00, 3),             
("Human Resources", 75000.00, 4);              

INSERT INTO department (name)
VALUES ("Finance & Accounting"),
("Marketing"),
("Legal"),
("Human Resources");