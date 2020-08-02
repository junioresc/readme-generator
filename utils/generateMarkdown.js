const generateContributing = contributingText => {
    if (!contributingText) {
        return ``;
    }
    return `
${contributingText}
    `
}

// function to generate markdown for README
function generateMarkdown(data) {
    return `
# ${data.title}

[![License](https://img.shields.io/badge/License-${data.license.slice(0, 3)}-blue)](LICENSE.txt)
[![Languages](https://img.shields.io/github/languages/top/${data.github}/${data.title})]()

## Description

${data.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Credits](#credits)
* [Questions](#questions)
    
## Installation

    ${data.install}

## Usage
    
${data.usage}

## License

Licensed under the [${data.license.slice(0, 3)}](LICENSE.txt) license.

## Contributing

${generateContributing(data.contributing)}

## Tests

    ${data.tests}

## Credits

${data.credits}

## Questions

[GitHub](https://github.com/${data.github}/)
If you have any additional questions and would like to reach me, you can at ${data.email}
  `;
  }
  
  module.exports = generateMarkdown;