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
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  startQuestions();
});

//build out inquirer with questions
// will need to have access to the data { choice }
startQuestions = () => {
 inquirer.prompt({
 
  type: 'list',
  name: 'action',
  messsage: 'What action would you like to take?',
  choices: [
   "Add a department.", "Add a role.", "Add an employee.", 
   "View departments", "View roles", "View employees", 
   "Update employees roles."
  ] 
}).then(function(data){

 //need to send user different responses for choices.
switch (data.action) {
 case "Add a department.":
  console.log("Success!")
 break;
 case "Add a role.":
  console.log("Success!")
 break;
 case "Add an employee.":
  console.log("Success!")
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
function addDepartment(){

}

function addRole() {

}
function addEmployee() {

}
//can probably make all 3 a dynamic function
function viewDepartmetn(){

}
function viewRoles(){
connection.query("SELECT * FROM roles", function (err, results){
if (err) throw err;
console.table(results)
})
}
function viewEmployees(){

}
function updateEmployees(){

}





startQuestions();

//add departments, roles, employees
//view departments, roles, employees
//update employee roles
