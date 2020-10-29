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
  console.log("\n============================")
  console.log(data)
  console.log("\n============================\n\n\n\n\n\n")
});

//once connected to Mysql the start questions function
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  startQuestions();
});

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
      "Update employees roles."
    ]
  }).then(function (data) {

    //need to send user different responses for choices.
    switch (data.action) {
      case "Add a department.":
        console.log("Success!")
        break;
      case "Add a role.":
        console.log("Success!")
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
    }

  })
    .catch(console.error)

}
addDepartment = () => {

}

addRole = () => {
  //grab all departments and ask what department it goes into
}
addEmployee = () => {
  connection.query(
    "SELECT * FROM roles", (function (err, result) {
      if (err) throw err
      // query to get all roles
      inquirer.prompt([
        {
          name: 'first_name',
          message: 'What is the employees first name?'
        }, {
          name: 'last_name',
          message: 'What is the employees last name?'
        }, {
          type: 'list',
          name: 'role',
          message: 'What is the employees role?',
          //grab each role and array then present that as the choices
          choices: () => {
            var choiceArray = [];
            for (var i = 0; i < result.length; i++) {
              choiceArray.push(result[i].title)
            }
            return choiceArray;
          }
        }
    ]).then(function (res) {
      let getRoleId;

      console.log(res)
      
      //array.find
      // var query = connection.query(
      //  "INSERT INTO employees SET ?", {
      //   first_name : { first_name },
      //   last_name : { last_name }

      //  })

    })
  }) 
  )
}
//calling department table
viewDepartment = () => {
  connection.query("SELECT * FROM departments", (err, results) => {
    if (err) throw err;
    console.table(results)
  })
}
//calling roles table
viewRoles = () => {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.table(res)
  })
}
//Iwould like to call the join function that I have in my seed.sql 
// in meantime just calling employee function
viewEmployees = () => {
  connection.query("SELECT * FROM ", function (err, res) {
    if (err) throw err;
    console.table(res)
  })
}
updateEmployees = () => {

}



//add departments, roles, employees
//view departments, roles, employees
//update employee roles
