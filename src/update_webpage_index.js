const fs = require('fs');
const yaml = require('js-yaml');
const preprocessor = require("./preprocess_github_languages");

function updateIndexFile(indexFile, badge_name, badge_prefix){
    var fileStream = fs.createWriteStream(indexFile, { flags: 'w' });
    
    let github_languages_yml = "../config/linguist/lib/linguist/languages.yml";
    let technologies_yml = "../config/technologies.yml";
    let os_yml = "../config/operating_systems.yml";

    // file header
    fileStream.write(header());
      

    // github languages styles
    fileStream.write('\n<h2>GitHub languages</h2>\n');
    write_badges(fileStream, preprocessor.preProcessGithubLanguagesFile(github_languages_yml), badge_name, badge_prefix);

    // technologies styles
    fileStream.write('\n<h2>Technlogies</h2>\n');
    write_badges(fileStream, read_yml(technologies_yml), badge_name, badge_prefix);

    // operating systems styles
    fileStream.write('\n<h2>Operating Systems</h2>\n');
    write_badges(fileStream, read_yml(os_yml), badge_name, badge_prefix);

    fileStream.write(footer());
}

function header(){
    return "<!DOCTYPE html>\n \
<html>\n<head>\n \
<link rel=\"stylesheet\" href = \"assets/css/tech-badges.css\">\n \
<link rel=\"stylesheet\" href = \"assets/css/style.css\">\n \
</head>\n<body>\n<h1>Tech Badges</h1>\n";
}

function footer(){
    return "\n</body>\n</html>";
}

function read_yml(file_path) {
    let fileContents = fs.readFileSync(file_path, 'utf8');
    return yaml.safeLoad(fileContents);
}

function write_badges(fileStream, badges, badge_name, badge_prefix){
    for (key in badges){
        let name = badges[key].name;
        let color = badges[key].color;
        let url = badges[key].url;        
        fileStream.write(`<a class="${badge_name} ${badge_prefix}-${key}" href="${url}" target="_blank">${name}</a>\n`);
    }
}

if (require.main === module) {
    updateIndexFile("../web-page/index.html", "badge", "tb");
}