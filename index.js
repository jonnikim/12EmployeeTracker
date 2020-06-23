const mysql = require("mysql");
const inquirer = require("inquirer");

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
  console.log("Viewing Employee");
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.log("id first_name last_name title department salary manager");
    console.log(res);
  });
}
function viewRole() {
  console.log("Viewing Role");
}
function viewDepartment() {
  console.log("Viewing Department");
}
function newEmployee() {
  console.log("Adding New Employee");
}
function newRole() {
  let name = [];
  connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    name = res;
  });
  console.log("Adding New Role");
}
function newDepartment() {
  console.log("Adding New Department");
}
function updateRole() {
  console.log("Updating Role");
}
