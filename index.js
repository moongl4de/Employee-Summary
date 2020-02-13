const inquirer = require("inquirer")
const fs = require("fs")

let team = []


const prompts = async function(questions){
    const userInput = await inquirer.prompt(questions);
    switch(userInput.title){
        case "Manager":
           const office = await inquirer.prompt(managerPrompt)
           const updateData = {title: "manager", ...userInput, office};
           team.push(updateData)
           console.log(team)
            break;

        case "Engineer":
            let github = await inquirer.prompt(engineerPrompt)
            const updateData = {title: "Engineer", ...userInput, github}
            team.push(updateData)
            console.log(team)
            break;

        case "Intern":
            let school = await inquirer.prompt(internPrompt)
            const updateData = {title: "intern", ...userInput, school}
            team.push(updateData)
            console.log(team)
            break;
    }
}


function userInput(){
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

    prompts(questions)
}

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


// async function getOffice(){
//     await inquirer.prompt(managerPrompt)
//     return;
// }

// async function getGithub(){
//     await inquirer.prompt(engineerPrompt)
//     return;
// }

// async function getSchool(){
//     await inquirer.prompt(internPrompt)
//     return;
// }

userInput();