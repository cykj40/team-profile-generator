const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// code that creates objects for each team member. Asks users information to inject into the finished product.
const teamMembers = [];

function start() {
    manageQuery();
}

function manageQuery() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the team manager",
            },
            {
                type: "input",
                name: "id",
                message: "Team Manager's ID number:",
            },
            {
                type: "input",
                name: "email",
                message: "Team Manager's email address:",
            },
            {
                type: "input",
                name: "officeNumber",
                message: " Team manger's office number:",
            },
        ])
        .then((val) => {
            const manager = new Manager(
                val.name,
                val.id,
                val.email,
                val.officeNumber
            );
            console.table(manager);
            teamMembers.push(manager);
            addTeamMember();
        });
}

function addTeamMember() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "what_type",
                message: "Add an engineer or intern to the team?",
                choices: ["Engineer", "Intern", "Not at this time"],
            },
        ])
        .then((val) => {
            if (val.what_type === "Engineer") {
                engineerQuery();
            } else if (val.what_type === "Intern") {
                internQuery();
            } else {
                createFile();
            }
        });
}

function engineerQuery() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Engineer's name?",
            },
            {
                type: "input",
                name: "id",
                message: "Engineer's ID number",
            },
            {
                type: "input",
                name: "email",
                message: " Engineer's email address:",
            },
            {
                type: "input",
                name: "github",
                message: "What is the Engineer's Github username?",
            },
        ])
        .then((val) => {
            const engineer = new Engineer(val.name, val.id, val.email, val.github);
            console.table(engineer);
            teamMembers.push(engineer);
            addTeamMember();
        });
}
function internQuery() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Intern's name?",
            },
            {
                type: "input",
                name: "id",
                message: "Intern's ID number:",
            },
            {
                type: "input",
                name: "email",
                message: "Intern's email address:",
            },
            {
                type: "input",
                name: "school",
                message: "What school does/did the intern attend?",
            },
        ])
        .then((val) => {
            const intern = new Intern(val.name, val.id, val.email, val.school);
            console.table(intern)
            teamMembers.push(intern);
            addTeamMember();
        });
}

function createFile() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    } else {
        fs.writeFileSync(outputPath, render(teamMembers), "UTF-8");
        console.log("File created in the output folder");
    }
}

start();