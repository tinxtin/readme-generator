const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const libraries = [];

async function askDetails() {
    return await inquirer
    .prompt(
        [
            {
                type: 'input',
                name: 'Title',
                message: 'Title of your project?',
            },
            {
                type: 'input',
                name: 'Description',
                message: 'Description of your project?',
            },
            {
                type: 'list',
                name: 'License',
                message: 'Which license applies to this application?',
                choices: [
                    'None', 'Apache-2.0', 'GPL-3.0', 'MIT', 'BSD-2-Clause',
                    'BSD-3-Clause', 'BSL-1.0', 'CC0-1.0', 'EPL-2.0', 'AGPL-3.0',
                    'GPL-2.0', 'LGPL-2.1', 'MPL-2.0', 'Unlicense'
                ]
            },
            {
                type: 'input',
                name: 'Contribution',
                message: 'Who contributed to this application?',
            },
            {
                type: 'input',
                name: 'Test',
                message: 'Who tested to this application?',
            },
        ]
    )
    .then((ans) => {
        return ans;
    })
};

const installedLibrary = [];

async function askLibrary() {
    return await inquirer
    .prompt(
        [
            {
                type: 'input',
                name: 'Installation',
                message: 'Installed library:',
            },
            {
                type: 'list',
                name: 'askAgain',
                message: 'Add another library?',
                choices: ['Yes', 'No']
            },
        ]
    )
    .then((ans) => {
        installedLibrary.push( ans.Installation )
        if ((ans.askAgain).toLowerCase() === 'yes') {
            return askLibrary();
        } else {
            return;
        }
    })
};

let stepInstructions = [];
let step = 1;
async function askInstruction() {
    return await inquirer
    .prompt(
        [
            {
                type: 'input',
                name: 'Usage',
                message: `Instruction to use the application! Step ${step}:`,
            },
            {
                type: 'list',
                name: 'askAgain',
                message: 'Add another step?',
                choices: ['Yes', 'No']
            }
        ]
    )
    .then((ans) => {
        stepInstructions = [ ...stepInstructions , ...ans.Usage ]
        if ((ans.askAgain).toLowerCase() === 'yes') {
            step++;
            return askInstruction(step);
        } else {
            return;
        }
    })
}




// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
async function init() {
    let ansBasics = await askDetails();
    let ansLibrary = await askLibrary();
    let ansInstruction = await askInstruction();
}

// function call to initialize program
init();
