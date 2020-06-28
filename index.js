const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "test",
  database: "businessDB",
});

connection.connect((err) => {
  if (err) throw err;
  mainMenu();
});
function mainMenu() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add New Employee",
        "Add New Role",
        "Add New Department",
        "Update Employee Roles",
      ],
    })
    .then((answer) => {
      switch (answer.menu) {
        case "View All Employees":
          viewEmployee();
          break;
        case "View All Roles":
          viewRole();
          break;
        case "View All Departments":
          viewDepartment();
          break;
        case "Add New Employee":
          newEmployee();
          break;
        case "Add New Role":
          newRole();
          break;
        case "Add New Department":
          newDepartment();
          break;
        case "Update Employee Roles":
          updateRole();
          break;
      }
    });
}
function viewEmployee() {
  connection.query(
    `SELECT e.id AS employee_id, e.first_name, e.last_name, d.name AS department_name, r.title AS job_title, r.salary, CONCAT(f.first_name, " ", f.last_name) AS manager_name FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee f ON e.manager_id = f.id;`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
}
function viewRole() {
  connection.query(
    `SELECT r.id AS role_id, r.title, r.salary, d.name AS department_name
    FROM role r
    LEFT JOIN department d
    ON r.department_id = d.id;`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
  console.log("Viewing Role");
}
function viewDepartment() {
  connection.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  console.log("Viewing Department");
}
function newEmployee() {
  let role = [];
  connection.query(`SELECT role.title FROM role`, (err, res) => {
    if (err) throw err;
    for (let m = 0; m < res.length; m++) {
      role.push(res[m].title);
    }
  });
  let manager = [];
  let manager_id = [];
  connection.query(
    `SELECT DISTINCT CONCAT(x.first_name, " ", x.last_name) AS manager_name, x.id AS manager_id 
    FROM employee e
    LEFT JOIN employee x
    ON e.manager_id = x.id;`,
    (err, res) => {
      //   console.log(res);
      for (let i = 0; i < res.length; i++) {
        if (res[i].manager_name !== null) {
          manager.push(res[i].manager_name);
          manager_id.push(res[i].manager_id);
        }
      }
    }
  );
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's First Name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's Last Name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is this employee's Role?",
        choices: role,
      },
      {
        name: "managers",
        type: "list",
        message: "Who is the Manager?",
        choices: manager,
      },
    ])
    .then(function (answer) {
      let roleIndex = role.indexOf(answer.role) + 1;
      let managerIndex = manager.indexOf(answer.managers);
      let managerID = manager_id[managerIndex];
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: roleIndex,
          manager_id: managerID,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee Added!");
          viewEmployee();
        }
      );
    });
}
function newRole() {
  viewRole();
  connection.query(`SELECT * FROM department`, (err, res) => {
    const departmentID = [];
    const departmentName = [];
    for (let k = 0; k < res.length; k++) {
      departmentID.push(res[k].id);
      departmentName.push(res[k].name);
    }
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "role",
          type: "input",
          message: "What is the name of the role?",
        },
        {
          name: "salary",
          type: "number",
          message: "What is the salary amount?",
        },
        {
          name: "newDepartmentID",
          type: "list",
          message: "What department does it belong to?",
          choices: departmentName,
        },
      ])
      .then(function (answer) {
        let index = departmentName.indexOf(answer.newDepartmentID);
        connection.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [answer.role, answer.salary, departmentID[index]],
          function (err, res) {
            if (err) throw err;
          }
        );
        viewRole();
      });
  });
}
function newDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the name of the department?",
    })
    .then(function (answer) {
      console.log(answer);
      let department = answer.department;
      console.log(department);
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        answer.department,
        function (err, res) {
          if (err) throw err;
        }
      );
      viewDepartment();
    });
}
function updateRole() {
  const firstName = [];
  const lastName = [];
  const fullName = [];
  const role = [];
  connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      firstName.push(res[i].first_name);
      lastName.push(res[i].last_name);
      fullName.push(res[i].first_name + " " + res[i].last_name);
    }
  });

  connection.query(`SELECT role.title FROM role`, (err, res) => {
    if (err) throw err;
    for (let m = 0; m < res.length; m++) {
      role.push(res[m].title);
    }
    inquirer
      .prompt([
        {
          name: "role",
          type: "list",
          message: "Which employee would you like to update?",
          choices: fullName,
        },
        {
          name: "newRole",
          type: "list",
          message: "Select new Role",
          choices: role,
        },
      ])
      .then(function (answer) {
        let nameIndex = fullName.indexOf(answer.role);
        let roleIndex = role.indexOf(answer.newRole) + 1;
        connection.query(
          "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?",
          [roleIndex, firstName[nameIndex], lastName[nameIndex]],
          function (err, res) {
            if (err) throw err;
          }
        );
      });
  });
}
