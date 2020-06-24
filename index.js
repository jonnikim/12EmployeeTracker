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
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      //   console.log(
      //     "ID: " +
      //       res[i].id +
      //       " || First Name: " +
      //       res[i].first_name +
      //       " || Last Name: " +
      //       res[i].last_name +
      //       " || Role: " +
      //       res[i].role_id +
      //       " || Department: " +
      //       res[i].department_id +
      //       " || Salary: " +
      //       res[i].salary +
      //       " || Manager: " +
      //       res[i].manager_id
      //   );
      console.table([
        "ID",
        "First Name",
        "Last Name",
        "Role",
        "Department",
        "Salary",
        "Manager",
      ]);
    }
  });
}
function viewRole() {
  console.log("Viewing Role");
}
function viewDepartment() {
  console.log("Viewing Department");
}
function newEmployee() {
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
        type: "input",
        message: "What is this employee's Role?",
      },
      {
        name: "manager",
        type: "input",
        message: "Who is the Manager?",
      },
    ])
    .then(function (answer) {
      const roleValue = 2;
      const managerValue = 2;
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: roleValue,
          manager_id: managerValue,
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
  console.log("Adding new Role");
}
function newDepartment() {
  console.log("Adding New Department");
}
function updateRole() {
  const name = [];
  connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      name.push(res[i].first_name + " " + res[i].last_name);
    }
    inquirer.prompt({
      name: "role",
      type: "list",
      message: "Which employee would you like to update?",
      choices: name,
    });
  });
}
