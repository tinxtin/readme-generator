const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
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
        name: 'TOC',
        message: 'Include table of content?',
        choices: ['Yes', 'No'],
    },
    {
        type: 'input',
        name: 'Installation',
        message: 'Instruction to install the libraries to run this application.',
    },
    {
        type: 'input',
        name: 'Usage',
        message: 'Step-by-step instruction to use the application.',
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
];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
    inquirer
        .prompt(questions)
        .then(
            
        )
}

// function call to initialize program
init();
