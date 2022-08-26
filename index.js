const Manager = require("");
const Engineer = require("");
const Intern = require("");
const Inquirer = require("inquirer");
const Path = require("path");
const fs = require("fs");
const { default: inquirer } = require("inquirer");
const { createInflate } = require("zlib");

const OUTPUT_DIR = path.resolve(_dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = ("")

const teamMembers = [];

function start() {
    manageQuery();
}

function mangeQuery() {
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
                name: " what_type",
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