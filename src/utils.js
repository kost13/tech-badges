const fs = require('fs');
const yaml = require('js-yaml');

exports.preprocessGithubLanguagesFile = function(filePath) {
    try {
        let fileContents = fs.readFileSync(filePath, 'utf8');
        let data = yaml.safeLoad(fileContents);
        let githubUrl = "https://github.com/trending/";

        let filtered = {}

        let regex = new RegExp("^[a-zA-Z0-9]*$");

        for (key in data){
            if("color" in data[key]){

                let processedKey = key
                if("aliases" in data[key] && !regex.test(key)){
                    for(alias of data[key].aliases){
                        if(regex.test(alias)){
                            processedKey = alias;                            
                            break;
                        }
                    }
                }

                processedKey = processedKey.toLowerCase().replace(/ /g, "_").replace(/#/g, "sharp").replace(/\+/g, "p");

                filtered[processedKey] = {
                    color: data[key].color,
                    name: key,
                    url: githubUrl + processedKey
                };
            }
        }

        return filtered;

    } catch (e) {
        console.log(e);
        return null;
    }
}

exports.readYml = function(filePath) {
    let fileContents = fs.readFileSync(filePath, 'utf8');
    return yaml.safeLoad(fileContents);
}
