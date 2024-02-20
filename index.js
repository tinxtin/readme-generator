const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

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
                name: 'Test',
                message: 'How to test this application?',
            },
            {
                type: 'input',
                name: 'Email',
                message: 'Enter email?',
            },
            {
                type: 'input',
                name: 'Github',
                message: 'Enter github username?',
            },
        ]
    )
    .then((ans) => {
        return [ans];
    })
};

let stepContribution = {steps: []}
let stepCon = 1;
async function askContribution() {
    return await inquirer
    .prompt(
        [
            {
                type: 'input',
                name: 'Contribution',
                message: `How to contribute to this application? Step ${stepCon}:`,
            },
            {
                type: 'list',
                name: 'askAgain',
                message: 'Add another step?',
                choices: ['Yes', 'No']
            },
        ]
    )
    .then((ans) => {
        stepContribution.steps.push(ans.Contribution)
        if ((ans.askAgain).toLowerCase() === 'yes') {
            stepCon++;
            return askContribution();
        } else {
            return [stepContribution];
        }
    })
}

let insLibrary = {libraries: []}
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
        insLibrary.libraries.push(ans.Installation)
        if ((ans.askAgain).toLowerCase() === 'yes') {
            return askLibrary();
        } else {
            return [insLibrary];
        }
    })
};

let stepInstructions = {steps: []};
let stepIns = 1;
async function askInstruction() {
    return await inquirer
    .prompt(
        [
            {
                type: 'input',
                name: 'Usage',
                message: `Instruction to use the application! Step ${stepIns}:`,
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
        stepInstructions.steps.push(ans.Usage)
        if ((ans.askAgain).toLowerCase() === 'yes') {
            stepIns++;
            return askInstruction();
        } else {
            return [stepInstructions];
        }
    })
}




// function to write README file
function writeToFile(fileName, data) {
    const template = `
[![License: ${data[0].License}](https://img.shields.io/badge/License-${(data[0].License).toLowerCase()}-yellow.svg)](https://opensource.org/licenses/${data[0].License})

## Table of content
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [Testing](#Testing)
- [License](#License)
- [Questions](#Questions)
- [Authors](#Authors)

# ${data[0].Title}

## Description
${data[0].Description}

## Installation

Libraries required to be installed to use this application: 
${data[1].libraries}

## Usage

These are the simple steps on how to use this application:
${data[3].steps}

## Contributing
If you have a suggestion that would make this better, please fork the repo and create a pull request.
Follow the following steps to contribute:
${data[2].steps}

## Testing

${data[0].Test}

## License
Distributed under the [${data[0].License}](https://choosealicense.com/licenses/${data[0].License}/) License.

## Questions
Reach out to me with this email: ${data[0].Email}
Happy to answer all question related to this application.

## Authors
[${data[0].Github}](https://github.com/${data[0].Github})
`

    fs.writeFile(`${fileName}.md`, template, (err) => {
        if (err) {
            console.error(err);
          } else {
            console.log('File successfully generated!')
          }
    });
}

// function to initialize program
async function init() {
    let ansDetail = await askDetails();
    let ansLibrary = await askLibrary();
    let ansContribution = await askContribution();
    let ansInstruction = await askInstruction();
    let ansAll = [...ansDetail, ...ansLibrary , ...ansContribution,  ...ansInstruction]
    
    writeToFile('Read-me', ansAll)
}

// function call to initialize program
init();
