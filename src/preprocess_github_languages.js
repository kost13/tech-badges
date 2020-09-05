const fs = require('fs');
const yaml = require('js-yaml');

module.exports = {
    preProcessGithubLanguagesFile: function(sourceFile){
        try {
            let fileContents = fs.readFileSync(sourceFile, 'utf8');
            let data = yaml.safeLoad(fileContents);
            let githubUrl = "https://github.com/trending/";
    
            let filtered = {}
    
            let regex = new RegExp("^[a-zA-Z0-9]*$");
    
            for (key in data){
                if("color" in data[key]){
    
                    let processed_key = key
                    if("aliases" in data[key] && !regex.test(key)){
                        for(alias of data[key].aliases){
                            if(regex.test(alias)){
                                processed_key = alias;                            
                                break;
                            }
                        }
                    }
    
                    processed_key = processed_key.toLowerCase().replace(/ /g, "_").replace(/#/g, "sharp").replace(/\+/g, "p");
    
                    filtered[processed_key] = {
                        color: data[key].color,
                        name: key,
                        url: githubUrl + processed_key
                    };
                }
            }
    
            return filtered;
    
        } catch (e) {
            console.log(e);
            return null;
        }
    }
};
