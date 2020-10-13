const fs = require('fs');
const { readYml, preprocessGithubLanguagesFile } = require("./utils");
const configPaths = require('./config_files_paths.json');


function updateIndexFile(indexFile, badge_name, badge_prefix) {
    const fileStream = fs.createWriteStream(indexFile, { flags: 'w' });

    // file header
    fileStream.write(header());

    for (const config of configPaths) {
        let content;
        if (config.name === 'GitHub Languages') {
            content = preprocessGithubLanguagesFile(config.path);
        } else {
            content = readYml(config.path);
        }
        fileStream.write(`\n<h2>${config.name}</h2>\n`)
        writeBadges(fileStream, content, badge_name, badge_prefix);
    }

    fileStream.write(footer());
}

function header() {
    return "<!DOCTYPE html>\n\
<html>\n<head>\n\
<link rel=\"stylesheet\" href=\"assets/css/tech-badges.css\">\n\
<link rel=\"stylesheet\" href=\"assets/css/style.css\">\n\
</head>\n<body>\n<h1>Tech Badges</h1>\n";
}

function footer() {
    return "\n</body>\n</html>";
}

function writeBadges(fileStream, badges, badge_name, badge_prefix) {
    for (key in badges) {
        let name = badges[key].name;
        let url = badges[key].url;        
        fileStream.write(`<a class="${badge_name} ${badge_prefix}-${key}" href="${url}" target="_blank">${name}</a>\n`);
    }
}

if (require.main === module) {
    updateIndexFile("../webpage/index.html", "badge", "tb");
}
