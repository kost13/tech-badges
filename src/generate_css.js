const fs = require('fs');
const yaml = require('js-yaml');
const preprocessor = require("./preprocess_github_languages");

function generate_css_file(file_name, badge_name, badge_prefix){
    var fileStream = fs.createWriteStream(file_name, { flags: 'w' });

    let github_languages_yml = "../config/linguist/lib/linguist/languages.yml";
    let technologies_yml = "../config/technologies.yml";
    let os_yml = "../config/operating_systems.yml";

    // file header
    fileStream.write(header());
      
    //badge definition
    fileStream.write(badge_shape_style(badge_name));

    // github languages styles
    fileStream.write('\n/* GitHub languages */\n');
    write_style_from_config(fileStream, preprocessor.preProcessGithubLanguagesFile(github_languages_yml), badge_prefix);

    // technologies styles
    fileStream.write('\n/* Technologies */\n');
    write_style_from_config(fileStream, read_yml(technologies_yml), badge_prefix);

    // operating systems styles
    fileStream.write('\n/* Operating Systems */\n');
    write_style_from_config(fileStream, read_yml(os_yml), badge_prefix);

    fileStream.end();
}

function read_yml(file_path) {
    let fileContents = fs.readFileSync(file_path, 'utf8');
    return yaml.safeLoad(fileContents);
}

function write_style_from_config(fileStream, config, badge_prefix){
    for (key in config){
        let name = config[key].name;
        let color = config[key].color;

        fileStream.write(`\n/* ${name} */ \n`)
        fileStream.write(`.${badge_prefix}-${key} { background-color: ${color}; }\n`);
    }
}

function header(){
    return "/*\n \
Tech-badges\n \
https://github.com/kost13/tech-badges\n \
This file was generated automatically and shouldn't be modified manually.\n \
*/\n";
}

function badge_shape_style(name) {
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
    generate_css_file("../dist/tech-badges.css", "badge", "tb");
}