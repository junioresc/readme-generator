const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const fs = require("fs");

// array of questions for user
const questions = [
    {
        type: `input`,
        name: `title`,
        message: `What is the title of your project? (Required)`,
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log(`Please enter a project title!`);
                return false;
            }
        }
    },
    {
        type: `input`,
        name: `github`,
        message: `What is your GitHub username? (Required)`,
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log(`Please enter a GitHub username!`);
                return false;
            }
        }
    },
    {
        type: `input`,
        name: `email`,
        message: `Please enter a contact email: (Required)`,
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log(`Please enter a contact email!`);
                return false;
            }
        }
    },
    {
        type: `input`,
        name: `description`,
        message: `Provide a description of the project: (Required)`,
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log(`Please enter a description for the project!`);
                return false;
            }
        }
    },
    {
        type: `input`,
        name: `install`,
        message: `Would you like to add any steps to the Installation?`,
        default: `npm i`
    },
    {
        type: `input`,
        name: `usage`,
        message: `Provide some information on how to use your program and examples for use. Include screenshots as needed:`
    },
    {
        type: `input`,
        name: `credits`,
        message: `List any collaborators, third-party assets, or tutorials you followed with links for the credits:`
    },
    {
        type: `list`,
        name: `license`,
        message: `Please choose a license for your project:`,
        choices: [`MIT License`, `Apache License`, `GNU-GPLv3`, `The-Unlicense`]
    },
    {
        type: `confirm`,
        name: `confirmContributing`,
        message: `Do you want to add information about contributing?`,
        default: false
    },
    {
        type: `input`,
        name: `contributing`,
        message: `Provide steps for how other developers can contribute to your project:`,
        when: ({ confirmContributing }) => confirmContributing
    },
    {
        type: `input`,
        name: `tests`,
        message: `Provide examples on how to run tests on your application:`,
        default: `npm test`
    }
];

// function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./dist/${fileName}`, data, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: `Readme file created!`
            });
        });
    });
};

// function to initialize program
function init() {
    return inquirer.prompt(questions)
        .then(answers => generateMarkdown(answers))
        .then(markdown => writeToFile(`README.md`, markdown))
        .then(writeFileResponse => console.log(writeFileResponse))
        .catch(err => console.log(err));
}

// function call to initialize program
init();