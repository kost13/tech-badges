const fs = require('fs');
const { readYml, preprocessGithubLanguagesFile } = require("./utils");
const configPaths = require('./config_files_paths.json');


function generateCssFile(fileName, badgeName, badgePrefix){
    var fileStream = fs.createWriteStream(fileName, { flags: 'w' });

    // file header
    fileStream.write(header());

    //badge definition
    fileStream.write(badgeShapeStyle(badgeName));

    for (const config of configPaths) {
        let content;
        if (config.name === 'GitHub Languages') {
            content = preprocessGithubLanguagesFile(config.path);
        } else {
            content = readYml(config.path);
        }
        fileStream.write(`\n/* ${config.name} */\n`)
        writeStyleFromConfig(fileStream, content, badgePrefix);
    }

    fileStream.end();
}

function writeStyleFromConfig(fileStream, config, badgePrefix) {
    for (key in config){
        let name = config[key].name;
        let color = config[key].color;

        fileStream.write(`\n/* ${name} */ \n`)
        fileStream.write(`.${badgePrefix}-${key} { background-color: ${color}; }\n`);
    }
}

function header() {
    return "/**\n \
* Tech-badges\n \
* https://github.com/kost13/tech-badges\n \
* This file was generated automatically and shouldn't be modified manually.\n \
*/\n";
}

function badgeShapeStyle(name) {
    return `\n.${name} {\n \
    display: inline-block;\n \
    margin: 8px 0;\n \
    padding: 4px 6px;\n \
    font-size: small;\n \
    color: #fff;\n \
    background-color: #434746;\n \
    border-radius: 6px;\n \
    text-align: center;\n \
    outline: 0;\n \
    text-decoration: none;\n \
    }\n`;
}

if (require.main === module) {
    generateCssFile("../dist/tech-badges.css", "badge", "tb");
}
