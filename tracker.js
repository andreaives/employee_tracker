//require in inquirer & MySQl
const inquirer = require("inquirer");
var mysql = require("mysql");

//create Mysql connection
var connection = mysql.createConnection({
 host: "localhost",
 port: 3306,
 user: "root",
 password: "abcd1234",
 database: "workforce_db"
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
   "View departments", "View roles", "View employees",
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
   case "View departments":
    console.log("Success!")
    break;
   case "View roles":
    viewRoles()
    break;
   case "View employees":
    console.log("Success!")
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
 connection.query("SELECT * FROM roles", (function (err,results){
 // query to get all roles
 inquirer.prompt([
  {
   name: 'first_name',
   message: 'What is the employees first name?' 
 },{
  name: 'last_name',
  message: 'What is the employees last name?' 
 },{
  type: 'list',
  name: 'role',
  message: 'What is the employees role?',
  choices: () => {
   let roleChoice = [];
   for (let role of results.title){
    roleChoice.push(role)
   }
  }
 }
 ])

}) //.then
 // //grab each role and array then present that as the choices
 // //choices map see 
 // connection.query(("INSERT INTO employees"))
 // //array.find
 // inquirer.prompt
 // var query = connecion.query(
 //  "INSERT INTO employees SET ?",

 )
}
//can probably make all 3 a dynamic function
viewDepartment = () => {

}
viewRoles = () => {
 connection.query("SELECT * FROM roles", function (err, results) {
  if (err) throw err;
  console.table(results)
 })
}
viewEmployees = () => {

}
updateEmployees = () => {

}





startQuestions();

//add departments, roles, employees
//view departments, roles, employees
//update employee roles
