const inquirer = require("inquirer")
const fs = require("fs")
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

//arrays for each role
let managerArray = []
let internArray = []
let engineerArray = []
//switch for determining whether the user needs to add more employees or if they are finished and need to generate the HTML
//1 = On (default)
//0 = Off (trigger HTML generator function)
let statusSwitch = 1

//prompt the user for some information regarding their dev team, then use a switch statement to run through the different roles and their exclusive prompts (Office # for manager, Github username for engineer, School fro intern)
const prompts = async function(questions){
    const userInput = await inquirer.prompt(questions);
    switch(userInput.title){
        case "Manager":
           const office = await inquirer.prompt(managerPrompt)
           const managerData = await new Manager(userInput.name, userInput.id, userInput.email, office.office)
           await managerArray.push(managerData)
           await addMoreEmployeesFunc()
           return;
           
        case "Engineer":
            let github = await inquirer.prompt(engineerPrompt)
            const engineerData = await new Engineer(userInput.name, userInput.id, userInput.email, github.github)
            await engineerArray.push(engineerData)
            console.log(engineerArray)
            await addMoreEmployeesFunc()
            return;

        case "Intern":
            let school = await inquirer.prompt(internPrompt)
            let internData = await new Intern(userInput.name, userInput.id, userInput.email, school.school)
            internArray.push(internData)
            console.log(internArray)
            await addMoreEmployeesFunc()
            return;
    }
}
//user input function that holds the main questions that apply to all Employee roles
async function userInput(){
    const questions = [
        {
            type: "input",
            name: "name",
            message: "What's the employee's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What's the employee's id number?"
        },
        {
            type: "input",
            name: "email",
            message: "What's the employee's email address?"
        },    
        {
            type: "list",
            name: "title",
            message: "What is the employee's title?",
            choices: ["Manager", "Engineer", "Intern"]
        }
    ]
    await prompts(questions)
    if(statusSwitch === 1){
    userInput()
    }

}
//Function for determining whether or not the user wants to add more employees to their team. If "No" is selected, the statusSwitch is turned of(set to 0) and the generateHtml function is called
async function addMoreEmployeesFunc(){
    let checkStatus = await inquirer.prompt(addMoreEmployees)
    console.log(checkStatus.addConfirm)
    if(checkStatus.addConfirm === "No"){
        statusSwitch = 0;
     console.log("Generate HTML")
     generateHtml()   
    }
}

//Prompts exclusive to certain roles
const managerPrompt = {
    type: "input",
    name: "office",
    message: "What's the manager's office number?"
}

const engineerPrompt = {
    type: "input",
    name: "github",
    message: "What's the engineer's Github username?"
}

const internPrompt = {
    type: "input",
    name: "school",
    message: "What's school is the intern attending?"
}
//Prompt to determine if more employees need to be added
const addMoreEmployees = {
    type: "list",
    name: "addConfirm",
    message: "Do you want to add more employees?",
    choices: ["Yes", "No"]
}

//Function to generate HTML
//Generates the HTML boilerplate, then goes through a series of loops that go through each of the role arrays and generate cards with the relevant information, then appends the cards to team-profile.html
function generateHtml(){
    htmlHead();
    for(let i = 0; i < managerArray.length; i++){
       const managerHtml = `<div class="card" style="width: 300px">
        <div class="card-header text-white bg-dark">
        <h3 style="text-align: center;">${managerArray[i].name}</h3>
        <i class="fas fa-eye fa-4x d-flex justify-content-center"></i>
        <h5 style="text-align: center;">Manager</h5>
        </div>
        <div class="card-body bg-light text-dark">
        <ul class="list-group">
            <li class="list-group-item" style="text-align: center;">ID: ${managerArray[i].id}</li>
            <li class="list-group-item" style="text-align: center;">Email: ${managerArray[i].email}</li>
            <li class="list-group-item" style="text-align: center;">Office Number: ${managerArray[i].officeNumber}</li>
        </ul>
        </div>
        </div>`

        fs.appendFile('output/team-profile.html', managerHtml, 'utf8', function (error) {
            if (error) {
                console.log(error)
            }
        });

    }
    for(let i = 0; i < engineerArray.length; i++){

        const engineerHtml = `<div class="card" style="width: 300px">
        <div class="card-header text-white bg-dark">
        <h3 style="text-align: center;">${engineerArray[i].name}</h3>
        <i class="fas fa-code fa-4x d-flex justify-content-center"></i>
        <h5 style="text-align: center;">Engineer</h5>
        </div>
        <div class="card-body bg-light text-dark">
        <ul class="list-group">
            <li class="list-group-item" style="text-align: center;">ID: ${engineerArray[i].id}</li>
            <li class="list-group-item" style="text-align: center;">Email: ${engineerArray[i].email}</li>
            <li class="list-group-item" style="text-align: center;">Github:${engineerArray[i].github}</li>
        </ul>
        </div>
        </div>`

        fs.appendFile('output/team-profile.html', engineerHtml, 'utf8', function (error) {
            if (error) {
                console.log(error)
            }
        });

    }
    for(let i = 0; i < internArray.length; i++){

        const internHtml = `<div class="card" style="width: 300px">
        <div class="card-header text-white bg-dark">
        <h3 style="text-align: center;">${internArray[i].name}</h3>
        <i class="fas fa-address-card fa-4x d-flex justify-content-center"></i>
        <h5 style="text-align: center;">Intern</h5>
        </div>
        <div class="card-body bg-light text-dark">
        <ul class="list-group">
            <li class="list-group-item" style="text-align: center;">ID: ${internArray[i].id}</li>
            <li class="list-group-item" style="text-align: center;">Email: ${internArray[i].email}</li>
            <li class="list-group-item" style="text-align: center;">School: ${internArray[i].school}</li>
        </ul>
        </div>
        </div>`

        fs.appendFile('output/team-profile.html', internHtml, 'utf8', function (error) {
            if (error) {
                console.log(error)
            }
        });
    }
}
//Function to append the HTML boilerplate to team-profile.html
function htmlHead(){
    const htmlHead = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/1568d8381b.js" crossorigin="anonymous"></script>
        <title>Team Profile</title>
    </head>
    <body>
    <header style="width: 100%; background-color: grey; height: 50px;">
    <h2 style="text-align: center;">Developer Team</h2>
    </header>
    <div class="container d-flex justify-content-center">`

    fs.appendFile('output/team-profile.html', htmlHead, 'utf8', function (error) {
        if (error) {
            console.log(error)
        }
    });
}

//If the statusSwitch is set to 1, call userInput()
if(statusSwitch === 1){
    userInput();
    }


