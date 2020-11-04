//require in inquirer & MySQl
const inquirer = require("inquirer");
const mysql = require("mysql");
const figlet = require("figlet")

//create Mysql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "abcd1234",
  database: "workforce_db"
});

figlet('EMPLOYEE-MANAGER', function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log("\n============================================")
  console.log(data)
  displayEmployees();
});

//once connected to Mysql the start questions function
connection.connect(function (err) {
  if (err) throw err;

});

displayEmployees = () => {
  connection.query("SELECT employees.first_name, employees.last_name, roles.title, departments.name, roles.salary FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON employees.department_id = departments.id ", function (err, res) {
    if (err) throw err;
    console.log("\n============================================")
    console.table(res)
    console.log("============================================\n\n")
    startQuestions();
  })

}

//build out inquirer with questions
// will need to have access to the data { choice }
startQuestions = () => {

  inquirer.prompt({

    type: 'list',
    messsage: 'What action would you like to take?',
    name: 'action',
    choices: [
      "Add a department.", "Add a role.", "Add an employee.",
      "View all departments", "View all roles", "View all employees",
      "Update employees roles.", "EXIT"
    ]
  }).then(function (data) {

    //need to send user different responses for choices.
    switch (data.action) {
      case "Add a department.":
        addDepartment()
        break;
      case "Add a role.":
        addRole();
        break;
      case "Add an employee.":
        addEmployee();
        break;
      case "View all departments":
        viewDepartment();
        break;
      case "View all roles":
        viewRoles()
        break;
      case "View all employees":
        viewEmployees()
        break;
      case "Update employees roles.":
        console.log("Success!")
        break;
      case 'EXIT':
        exitManager()
        break;
    }

  })
    .catch(console.error)

}
addDepartment = () => {
  connection.query(
    "SELECT * FROM roles", (function (err, result) {
      if (err) throw err
      inquirer.prompt([
        {
          name: 'newDepartment',
          message: 'What department would you like to add?'
        }
      ]).then(function (answer) {
        console.log(answer)
        connection.query(
          "INSERT INTO departments SET ?",
          {
            id: result.id,
            name: answer.newDepartment
          },

        )
        startQuestions();
      })
    })
  )
}


addRole = () => {
  connection.query(
    "SELECT * FROM roles", (function (err, result) {
      if (err) throw err
      inquirer.prompt([
        {
          name: 'newTitle',
          message: 'What role would you like to add??'
        },
        {
          name: 'newSalary',
          message: 'What is the salary paid to this role?'
        },
        {
          name: 'departmentID',
          message: 'What is the department id? Please refer to the table above if needed.'
        }
      ]).then(function (answer) {
        console.log(answer)
        let newSalary = parseInt(answer.newSalary)
        let departmentID = parseInt(answer.departmentID)
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.newTitle,
            salary: newSalary,
            department_id: departmentID
          }
        )
        startQuestions();
      })
    })
  )
}

addEmployee = () => {
  connection.query(
    "SELECT * FROM roles", (function (err, result) {
      if (err) throw err
      // query to get all roles
      inquirer.prompt([
        {
          name: 'firstName',
          message: 'What is the employees first name?'
        }, {
          name: 'lastName',
          message: 'What is the employees last name?'
        }, {
          type: 'list',
          name: 'roleID',
          message: 'What is the employees role id?',
          choices: () => {
            var choiceArray = [];
            for (var i = 0; i < result.length; i++) {
              choiceArray.push(result[i].id)

            }
            return choiceArray;
          }
        }
      ]).then(function (answer) {
        let roleId = parseInt(answer.roleId)
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answer.newTitle,
            last_name: answer.lastName,
            role_id: roleId
          }
        )
        console.log(res)
        startQuestions();


      })
    })
  )
}
//calling department table
viewDepartment = () => {
  connection.query("SELECT * FROM roles RIGHT JOIN departments ON roles.department_id= departments.id", (err, results) => {
    if (err) throw err;
    console.table(results)
    startQuestions();

  })
}


//calling roles table
viewRoles = () => {
  connection.query("SELECT departments.name, roles.title, roles.salary FROM roles LEFT JOIN departments ON roles.department_id= departments.id", (err, res) => {
    if (err) throw err;
    console.table(res)
    startQuestions();
  })

}
//Iwould like to call the join function that I have in my seed.sql 
// in meantime just calling employee function
viewEmployees = () => {
  connection.query("SELECT employees.first_name, employees.last_name, roles.title, departments.name, roles.salary FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON employees.department_id = departments.id ", function (err, res) {
    if (err) throw err;
    console.table(res)
    startQuestions();
  })
}
updateEmployees = () => {

}

exitManager = () => {
  console.log('Have a great day (: ')
}

//add departments, roles, employees
//view departments, roles, employees
//update employee roles
